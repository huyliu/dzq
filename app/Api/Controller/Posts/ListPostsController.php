<?php

/**
 * Copyright (C) 2020 Tencent Cloud.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace App\Api\Controller\Posts;

use App\Api\Serializer\CommentPostSerializer;
use App\Api\Serializer\PostSerializer;
use App\Common\CacheKey;
use App\Common\PostCache;
use App\Models\Post;
use App\Models\User;
use App\Models\ThreadReward;
use App\Repositories\PostRepository;
use Discuz\Api\Controller\AbstractListController;
use Discuz\Auth\AssertPermissionTrait;
use Discuz\Common\Utils;
use Illuminate\Contracts\Routing\UrlGenerator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Tobscure\JsonApi\Exception\InvalidParameterException;

class ListPostsController extends AbstractListController
{
    use AssertPermissionTrait;

    /**
     * {@inheritdoc}
     */
    public $serializer = PostSerializer::class;

    /**
     * {@inheritdoc}
     */
    public $include = [
        'user',
        'replyUser',
        'commentUser',
        'images',
    ];

    /**
     * {@inheritdoc}
     */
    public $optionalInclude = [
        'user.groups',
        'thread.category',
        'thread.firstPost',
        'lastThreeComments',
        'lastThreeComments.user',
        'lastThreeComments.replyUser',
        'lastThreeComments.commentUser',
        'lastThreeComments.images',
        'deletedUser',
        'lastDeletedLog',
    ];

    /**
     * {@inheritdoc}
     */
    public $mustInclude = [
        'thread',
        'likeState',
    ];

    /**
     * {@inheritdoc}
     */
    public $sortFields = [
        'id',
        'replyCount',
        'likeCount',
        'createdAt',
        'updatedAt',
        'deletedAt',
    ];

    /**
     * @var PostRepository
     */
    protected $posts;

    /**
     * @var UrlGenerator
     */
    protected $url;

    /**
     * @var int|null
     */
    protected $postCount;

    /**
     * @var string
     */
    protected $tablePrefix;
    protected $cache;
    private $postCache;

    /**
     * @param PostRepository $posts
     * @param UrlGenerator $url
     */
    public function __construct(PostRepository $posts, UrlGenerator $url)
    {
        $this->posts = $posts;
        $this->url = $url;
        $this->tablePrefix = config('database.connections.mysql.prefix');
        $this->postCache = new PostCache();
        $this->cache = app('cache');
    }

    /**
     * {@inheritdoc}
     * @throws InvalidParameterException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $params = $request->getQueryParams();
        $filter = $this->extractFilter($request);
        $sort = $this->extractSort($request);

        $threadId = Arr::get($filter, 'thread');
        if(!empty($threadId)){
            $threadQuestionType = ThreadReward::query()->where('thread_id', $threadId)->first();
        }
        
        if(!isset($threadQuestionType->type) || ($threadQuestionType->type !== 0)){
            //?????????????????????????????????
            list($cacheKey, $posts) = $this->getCache($params,$filter, $document);
            if ($posts) {
                return $posts;
            }
        }
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $include = $this->extractInclude($request);
        $posts = $this->search($actor, $filter, $sort, $limit, $offset);
        $this->addDocument($document, $params, $this->postCount, $offset, $limit);
        Post::setStateUser($actor);
        // ?????????????????????????????????
        if (in_array('lastThreeComments', $include)) {
            $posts = $this->loadLastThreeComments($posts);
        }

        // ??????????????????????????????????????????
        if (in_array('lastDeletedLog', $include)) {
            $posts->map(function ($post) {
                $log = $post->logs()
                    ->with('user')
                    ->where('action', 'hide')
                    ->orderBy('created_at', 'desc')
                    ->first();

                $post->setRelation('lastDeletedLog', $log);
            });
        }

        // ???????????????
        if (Arr::get($filter, 'highlight') == 'yes') {
            $posts->load('stopWords');

            $posts->map(function (Post $post) {
                if ($post->stopWords) {
                    $stopWords = explode(',', $post->stopWords->stop_word);
                    $replaceWords = array_map(function ($word) {
                        return '<span class="highlight">' . $word . '</span>';
                    }, $stopWords);

                    $content = str_replace($stopWords, $replaceWords, $post->content);
                    $post->content = $content;
                }
            });
        }
        $posts->loadMissing($include);

        $posts->map(function ($post) {
            $post->rewards = floatval(sprintf('%.2f', $post->getPostReward()));
        });

        if($params['sort'] == 'createdAt'){
            $sorted = $posts->sortByDesc('rewards');
            $posts = $sorted->values();
        }

        if($this->canCache($params) && !empty($cacheKey)){
            $this->postCache->setPosts($posts);
            $this->cache->put($cacheKey, serialize($this->postCache), 5 * 60);
        }
        return $posts;
    }

    /**
     *???????????????????????????????????????
     * @param $filter
     * @param $document
     * @return array
     */
    private function getCache($params, $filter, $document)
    {
        $isMobile = Utils::isMobile() ? 1 : 0;
        $threadId = Arr::get($filter, 'thread');
        $cacheKey = CacheKey::POST_RESOURCE_BY_ID . $isMobile . $threadId;
        if (!$this->canCache($params)) {
            return [$cacheKey, false];
        }
        $data = $this->cache->get($cacheKey);
        if (!empty($data)) {
            $obj = unserialize($data);
            $metaLinks = $obj->getMetaLinks();
            $posts = $obj->getPosts();
            $this->addDocument($document, $metaLinks['params'], $metaLinks['count'], $metaLinks['offset'], $metaLinks['limit']);
            if ($posts->count() != 0 && $metaLinks['count'] != 0) {
                return [$cacheKey, $posts];
            }
        }
        return [$cacheKey, false];
    }

    private function canCache($params)
    {
        //pc??????????????????????????????
        if (isset($params['sort']) && $params['sort'] == '-createdAt') {
            return false;
        }
        if (isset($params['filter'])) {
            if (!isset($params['filter']['isComment'])) {
                return false;
            }
            if (strtolower($params['filter']['isComment']) == 'yes') {
                return false;
            }
        }
        $canCache = false;
        if (isset($params['include'])) {
            if ($params['include'] == 'firstPost') {
                $canCache = true;
            }
        }
        if (isset($params['page'])) {
            if ($params['page']['number'] == 1) {
                $canCache = true;
            }
        }
        return $canCache;
    }

    private function addDocument($document, $params, $count, $offset, $limit)
    {
        $document->addPaginationLinks(
            $this->url->route('posts.index'),
            $params,
            $offset,
            $limit,
            $this->postCount
        );

        $document->setMeta([
            'postCount' => $count,
            'pageCount' => ceil($count / $limit),
        ]);
        $this->postCache->setMetaLinks([
            'params' => $params,
            'count' => $count,
            'offset' => $offset,
            'limit' => $limit
        ]);
    }

    /**
     * @param $actor
     * @param $filter
     * @param $sort
     * @param int|null $limit
     * @param int $offset
     *
     * @return Collection
     */
    private function search($actor, $filter, $sort, $limit = null, $offset = 0)
    {
        $query = $this->posts->query()->select('posts.*')->whereVisibleTo($actor);

        $this->applyFilters($query, $filter, $actor);

        $this->postCount = $limit > 0 ? $query->count() : null;

        $query->skip($offset)->take($limit);

        foreach ((array)$sort as $field => $order) {
            $query->orderBy(Str::snake($field), $order);
        }

        // TODO: ???????????????????????????????????????????????????
        // $this->events->dispatch(new Searching($search, $criteria));

        return $query->get();
    }

    /**
     * @param Builder $query
     * @param array $filter
     * @param User $actor
     */
    private function applyFilters(Builder $query, array $filter, User $actor)
    {
        $query->where('posts.is_first', false);

        // ?????? ID
        if ($userId = Arr::get($filter, 'userId')) {
            $query->where('posts.user_id', $userId);
        }

        // ???????????????
        if ($username = Arr::get($filter, 'username')) {
            $query->leftJoin('users as users1', 'users1.id', '=', 'posts.user_id')
                ->where('users1.username', 'like', "%{$username}%");
        }

        // ??????????????? ID
        if ($deletedUserId = Arr::get($filter, 'deletedUserId')) {
            $query->where('posts.deleted_user_id', $deletedUserId);
        }

        // ????????????????????????
        if ($deletedUsername = Arr::get($filter, 'deletedUsername')) {
            $query->leftJoin('users as users2', 'users2.id', '=', 'posts.deleted_user_id')
                ->where('users2.username', 'like', "%{$deletedUsername}%");
        }

        // ???????????????????????????
        if ($createdAtBegin = Arr::get($filter, 'createdAtBegin')) {
            $query->where('posts.created_at', '>=', $createdAtBegin);
        }

        // ???????????????????????????
        if ($createdAtEnd = Arr::get($filter, 'createdAtEnd')) {
            $query->where('posts.created_at', '<=', $createdAtEnd);
        }

        // ???????????????????????????
        if ($deletedAtBegin = Arr::get($filter, 'deletedAtBegin')) {
            $query->where('posts.deleted_at', '>=', $deletedAtBegin);
        }

        // ???????????????????????????
        if ($deletedAtEnd = Arr::get($filter, 'deletedAtEnd')) {
            $query->where('posts.deleted_at', '<=', $deletedAtEnd);
        }

        // ??????
        if ($categoryId = Arr::get($filter, 'categoryId')) {
            $query->leftJoin('threads', 'threads.id', '=', 'posts.thread_id')
                ->where('threads.category_id', $categoryId);
        }

        // ??????
        if ($threadId = Arr::get($filter, 'thread')) {
            $query->where('posts.thread_id', $threadId);
        }

        // ??????
        if ($replyId = Arr::get($filter, 'reply')) {
            $query->where('posts.reply_post_id', $replyId);
        }

        // ?????????
        $isApproved = Arr::get($filter, 'isApproved');
        if ($isApproved === '1') {
            $query->where('posts.is_approved', Post::APPROVED);
        } elseif ($actor->can('approvePosts')) {
            if ($isApproved === '0') {
                $query->where('posts.is_approved', Post::UNAPPROVED);
            } elseif ($isApproved === '2') {
                $query->where('posts.is_approved', Post::IGNORED);
            }
        }

        // ?????????
        if ($isDeleted = Arr::get($filter, 'isDeleted')) {
            if ($isDeleted == 'yes' && $actor->can('viewTrashed')) {
                // ?????????????????????
                $query->whereNotNull('posts.deleted_at');
            } elseif ($isDeleted == 'no') {
                // ?????????????????????
                $query->whereNull('posts.deleted_at');
            }
        }

        // ???????????????
        if ($isComment = Arr::get($filter, 'isComment')) {
            if ($isComment == 'yes') {
                $this->serializer = CommentPostSerializer::class;

                $query->where('posts.is_comment', true);
            } elseif ($isComment == 'no') {
                $query->where('posts.is_comment', false);
            }
        }

        // ???????????????
        $queryWord = Arr::get($filter, 'q');
        $query->when($queryWord, function ($query, $queryWord) {
            $query->where('content', 'like', "%{$queryWord}%")->where('is_first', false);
        });

        // event(new ConfigurePostsQuery($query, $filter));
    }

    /**
     * ?????????????????????????????????
     *
     * @param Collection $posts
     * @return Collection
     */
    public function loadLastThreeComments(Collection $posts)
    {
        $postIds = $posts->pluck('id');

        $subSql = Post::query()
            ->selectRaw('count(*)')
            ->whereRaw($this->tablePrefix . 'a.`id` < `id`')
            ->whereRaw($this->tablePrefix . 'a.`reply_post_id` = `reply_post_id`')
            ->whereRaw($this->tablePrefix . 'a.`deleted_at` = `deleted_at`')
            ->whereRaw($this->tablePrefix . 'a.`is_first` = `is_first`')
            ->whereRaw($this->tablePrefix . 'a.`is_comment` = `is_comment`')
            ->whereRaw($this->tablePrefix . 'a.`is_approved` = `is_approved`')
            ->toSql();

        $allLastThreeComments = Post::query()
            ->from('posts', 'a')
            ->whereRaw('(' . $subSql . ') < ?', [3])
            ->whereIn('reply_post_id', $postIds)
            ->whereNull('deleted_at')
            ->where('is_first', false)
            ->where('is_comment', true)
            ->where('is_approved', Post::APPROVED)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function (Post $post) {
                $content = Str::of($post->content);

                if ($content->length() > Post::SUMMARY_LENGTH) {
                    $post->content = $content->substr(0, Post::SUMMARY_LENGTH)->finish(Post::SUMMARY_END_WITH);
                }

                return $post;
            });

        $posts->map(function (Post $post) use ($allLastThreeComments) {
            $post->setRelation('lastThreeComments', $allLastThreeComments->where('reply_post_id', $post->id)->take(3));
        });

        return $posts;
    }
}

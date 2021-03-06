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

namespace App\Api\Controller\Threads;

use App\Api\Serializer\ThreadSerializer;
use App\Common\CacheKey;
use App\Models\Order;
use App\Models\Post;
use App\Models\Thread;
use App\Models\User;
use App\Models\RedPacket;
use App\Repositories\PostRepository;
use App\Repositories\ThreadRepository;
use Carbon\Carbon;
use Discuz\Api\Controller\AbstractResourceController;
use Discuz\Auth\AssertPermissionTrait;
use Discuz\Auth\Exception\PermissionDeniedException;
use Illuminate\Contracts\Cache\Repository as Cache;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Tobscure\JsonApi\Exception\InvalidParameterException;

class ResourceThreadController extends AbstractResourceController
{
    use AssertPermissionTrait;

    /**
     * @var ThreadRepository
     */
    protected $threads;

    /**
     * @var PostRepository
     */
    protected $posts;

    /**
     * {@inheritdoc}
     */
    public $serializer = ThreadSerializer::class;

    /**
     * {@inheritdoc}
     */
    public $include = [
        'firstPost',
        'threadVideo',
        'threadAudio',
        'posts',
        'posts.user',
        'posts.replyUser',
        'posts.commentUser',
        'posts.thread',
        'posts.images',
    ];

    /**
     * {@inheritdoc}
     */
    public $optionalInclude = [
        'user.groups',
        'user.groups.permissionWithoutCategories',
        'category',
        'firstPost.likedUsers',
        'posts.likedUsers',
        'rewardedUsers',
        'paidUsers',
        'posts.mentionUsers',
        'firstPost.mentionUsers',
        'topic',
        'question',
        'question.beUser',
        'question.beUser.groups',
        'question.images',
        'onlookers',
    ];

    /**
     * {@inheritdoc}
     */
    public $mustInclude = [
        'user',
        'firstPost.images',
        'firstPost.attachments',
        'firstPost.postGoods',
    ];

    /**
     * @param ThreadRepository $threads
     * @param PostRepository $posts
     */
    public function __construct(ThreadRepository $threads, PostRepository $posts)
    {
        $this->threads = $threads;
        $this->posts = $posts;
        app()->instance('resourceThread',true);
    }

    /**
     * {@inheritdoc}
     * @throws InvalidParameterException
     * @throws PermissionDeniedException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        /** @var User $actor */
        $actor = $request->getAttribute('actor');
        $threadId = Arr::get($request->getQueryParams(), 'id');
        $include = $this->extractInclude($request);
        $stopViewCount = Arr::get($request->getQueryParams(), 'stopViewCount');

        $thread = $this->threads->findOrFail($threadId, $actor);

        $this->assertCan($actor, 'viewPosts', $thread);


        $cacheKey = CacheKey::THREAD_RESOURCE_BY_ID.$threadId;
        $cache = app('cache');
        $cacheData = $cache->get($cacheKey);
        if(!empty($cacheData)){
            $cacheThread = unserialize($cacheData);
            $cacheThread->view_count = $thread->view_count;
            $cacheThread->timestamps = false;
            if(!$stopViewCount){
                $cacheThread->increment('view_count');
            }
            if (($postRelationships = $this->getPostRelationships($include)) || in_array('posts', $include)) {
                $this->includePosts($cacheThread, $request, $postRelationships);
            }
            return $cacheThread;
        }


        // ????????????????????????
        if (($postRelationships = $this->getPostRelationships($include)) || in_array('posts', $include)) {
            $this->includePosts($thread, $request, $postRelationships);
        }

        // ???????????????????????????
        if (in_array('rewardedUsers', $include)) {
            $this->loadOrderUsers($thread, Order::ORDER_TYPE_REWARD);
        }

        // ???????????????????????????
        if (in_array('paidUsers', $include)) {
            $this->loadOrderUsers($thread, Order::ORDER_TYPE_THREAD);
        }

        // ???????????????????????????
        if (in_array('onlookers', $include)) {
            $this->loadOrderUsers($thread, Order::ORDER_TYPE_ONLOOKER);
        }

        // ???????????????????????????
        if ($thread->type === Thread::TYPE_OF_QUESTION) {
            $thread->question->setRelation('thread', $thread);
        }

        // ??????????????????
        $thread->loadMissing($include);

        $redPacket = RedPacket::query()->where('thread_id',$threadId)->first();
        if (!empty($redPacket)) {
            $redPacket = $redPacket->toArray();
            $thread->redPacket = $redPacket;
        }

        // ???????????????
        $thread->timestamps = false;
        if(!$stopViewCount){
            $thread->increment('view_count');
        }
        $cache->put($cacheKey,serialize($thread),5*60);
        return $thread;
    }

    /**
     * @param Thread $thread
     * @param ServerRequestInterface $request
     * @param array $include
     * @throws InvalidParameterException
     */
    private function includePosts(Thread $thread, ServerRequestInterface $request, array $include)
    {
        $actor = $request->getAttribute('actor');
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);

        $isDeleted = Arr::get($this->extractFilter($request), 'isDeleted');

        $posts = $thread->posts()
            ->whereVisibleTo($actor)
            ->when($isDeleted, function (Builder $query, $isDeleted) use ($actor) {
                if ($isDeleted == 'yes' && $actor->hasPermission('viewTrashed')) {
                    // ?????????????????????
                    $query->whereNotNull('posts.deleted_at');
                } elseif ($isDeleted == 'no') {
                    // ?????????????????????
                    $query->whereNull('posts.deleted_at');
                }
            })
            ->where('is_first', false)
            ->orderBy('created_at')
            ->skip($offset)
            ->take($limit)
            ->with($include)
            ->get()
            ->each(function (Post $post) use ($thread) {
                $post->thread = $thread;
            });

        $posts->map(function ($post) {
            $post->rewards = floatval(sprintf('%.2f', $post->getPostReward()));
        });

        $sorted = $posts->sortByDesc('rewards');

        $newPosts = $sorted->values();

        $thread->setRelation('posts', $newPosts);
    }

    /**
     * @param array $include
     * @return array
     */
    private function getPostRelationships(array $include)
    {
        $prefixLength = strlen($prefix = 'posts.');
        $relationships = [];

        foreach ($include as $relationship) {
            if (substr($relationship, 0, $prefixLength) === $prefix) {
                $relationships[] = substr($relationship, $prefixLength);
            }
        }

        return $relationships;
    }

    /**
     * @param Thread $thread
     * @param int $type
     * @return Thread
     */
    private function loadOrderUsers(Thread $thread, $type)
    {
        switch ($type) {
            case Order::ORDER_TYPE_REWARD:
                $relation = 'rewardedUsers';
                break;
            case Order::ORDER_TYPE_THREAD:
                $relation = 'paidUsers';
                $type = [Order::ORDER_TYPE_THREAD, Order::ORDER_TYPE_ATTACHMENT];
                break;
            case Order::ORDER_TYPE_ONLOOKER:
                $relation = 'onlookers';
                break;
            default:
                return $thread;
        }

        $orderUsers = Order::with('user')
            ->where('thread_id', $thread->id)
            ->where('status', Order::ORDER_STATUS_PAID)
            ->whereIn('type', is_array($type) ? $type : [$type])
            ->where('is_anonymous', false)
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        return $thread->setRelation($relation, $orderUsers->pluck('user')->filter());
    }
}

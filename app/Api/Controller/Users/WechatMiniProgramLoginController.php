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

namespace App\Api\Controller\Users;

use App\Api\Serializer\TokenSerializer;
use App\Commands\Users\AutoRegisterUser;
use App\Commands\Users\GenJwtToken;
use App\Events\Users\Logind;
use App\Exceptions\NoUserException;
use App\Models\User;
use App\Settings\SettingsRepository;
use App\User\Bind;
use Discuz\Api\Controller\AbstractResourceController;
use Discuz\Auth\AssertPermissionTrait;
use Discuz\Auth\Exception\PermissionDeniedException;
use Discuz\Auth\Guest;
use Discuz\Socialite\Exception\SocialiteException;
use Discuz\Wechat\EasyWechatTrait;
use Exception;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Contracts\Events\Dispatcher as Events;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class WechatMiniProgramLoginController extends AbstractResourceController
{
    use AssertPermissionTrait;
    use EasyWechatTrait;

    public $serializer = TokenSerializer::class;

    protected $bus;

    protected $cache;

    protected $validation;

    protected $events;

    protected $settings;

    protected $bind;

    protected $db;

    public function __construct(Dispatcher $bus, Repository $cache, ValidationFactory $validation, Events $events, SettingsRepository $settings, Bind $bind, ConnectionInterface $db)
    {
        $this->bus = $bus;
        $this->cache = $cache;
        $this->validation = $validation;
        $this->events = $events;
        $this->settings = $settings;
        $this->bind = $bind;
        $this->db = $db;
    }

    /**
     * @inheritDoc
     * @throws SocialiteException
     * @throws PermissionDeniedException
     * @throws Exception
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        $rebind = Arr::get($attributes, 'rebind', 0);
        $actor = $request->getAttribute('actor');
        $user = !$actor->isGuest() ? $actor : new Guest();

        $js_code = Arr::get($attributes, 'js_code');
        $iv = Arr::get($attributes, 'iv');
        $encryptedData =Arr::get($attributes, 'encryptedData');
        $this->validation->make(
            $attributes,
            ['js_code' => 'required','iv' => 'required','encryptedData' => 'required']
        )->validate();

        // ???????????????
        $this->db->beginTransaction();
        try {
            $wechatUser = $this->bind->bindMiniprogram($js_code, $iv, $encryptedData, $rebind, $user, true);
        } catch (Exception $e) {
            $this->db->rollback();
            throw new Exception($e->getMessage(), 500);
        }

        if ($wechatUser->user_id) {
            //????????????????????????
            $user = $wechatUser->user;

            //???????????????
            if (!$user) {
                $this->db->rollback();
                throw new \Exception('bind_error');
            }
        } else {
            //????????????
            if (Arr::get($attributes, 'register', 0)) {
                //????????????????????????
                if (!(bool)$this->settings->get('register_close')) {
                    $this->db->rollback();
                    throw new PermissionDeniedException('register_close');
                }

                //???????????????
                $data['code'] = Arr::get($attributes, 'code');
                $data['username'] = Str::of($wechatUser->nickname)->substr(0, 15);
                $data['register_reason'] = trans('user.register_by_wechat_miniprogram');
                $user = $this->bus->dispatch(
                    new AutoRegisterUser($request->getAttribute('actor'), $data)
                );
                $wechatUser->user_id = $user->id;
                // ??????????????????save???????????????????????????
                $wechatUser->setRelation('user', $user);
                $wechatUser->save();

                $this->db->commit();
            } else {
                $this->db->commit();
                $noUserException = new NoUserException();
                $noUserException->setUser(['username' => $wechatUser->nickname, 'headimgurl'=>$wechatUser->headimgurl]);
                throw $noUserException;
            }
        }
        $this->db->commit();

        //?????? token
        $params = [
            'username' => $user->username,
            'password' => ''
        ];

        $response = $this->bus->dispatch(
            new GenJwtToken($params)
        );

        //???????????????????????????????????????
        if ($response->getStatusCode() === 200) {
            if($user->status!=User::STATUS_MOD){
                $this->events->dispatch(new Logind($user));
            }
        }

        return json_decode($response->getBody());
    }
}

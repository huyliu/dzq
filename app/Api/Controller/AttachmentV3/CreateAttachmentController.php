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

namespace App\Api\Controller\AttachmentV3;

use App\Api\Serializer\AttachmentSerializer;
use App\Commands\Attachment\AttachmentUploader;
use App\Common\ResponseCode;
use App\Events\Attachment\Saving;
use App\Events\Attachment\Uploaded;
use App\Events\Attachment\Uploading;
use App\Models\Attachment;
use App\Models\Dialog;
use App\Models\DialogMessage;
use App\Models\Group;
use App\Repositories\UserRepository;
use App\Validators\AttachmentValidator;
use Discuz\Base\DzqController;
use Discuz\Base\DzqLog;
use Discuz\Foundation\EventsDispatchTrait;
use Discuz\Wechat\EasyWechatTrait;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;
use Illuminate\Http\UploadedFile;


class CreateAttachmentController extends DzqController
{
    use EventsDispatchTrait;

    use EasyWechatTrait;

    protected $events;

    protected $validator;

    protected $uploader;

    public function __construct(Dispatcher $events, AttachmentValidator $validator, AttachmentUploader $uploader)
    {
        $this->events = $events;
        $this->validator = $validator;
        $this->uploader = $uploader;
    }

    protected function checkRequestPermissions(UserRepository $userRepo)
    {
        $type = $this->inPut('type') ?: 0;

        $typeMethodMap = [
            Attachment::TYPE_OF_FILE => [$userRepo, 'canInsertAttachmentToThread'],
            Attachment::TYPE_OF_IMAGE => [$userRepo, 'canInsertImageToThread'],
            Attachment::TYPE_OF_AUDIO => [$userRepo, 'canInsertAudioToThread'],
            Attachment::TYPE_OF_VIDEO => [$userRepo, 'canInsertVideoToThread'],
            Attachment::TYPE_OF_ANSWER => [$userRepo, 'canInsertRewardToThread'],
            Attachment::TYPE_OF_DIALOG_MESSAGE => [$userRepo, 'canCreateDialog'],
        ];
        // ?????????????????????????????????????????? type ????????????
        if (!isset($typeMethodMap[$type])) {
            return true;
        }

        //??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        try {
            if (!empty($groupId = $this->user->getRelations()['groups'][0]->getAttribute('id')) && $groupId == Group::UNPAID) {
                $group = Group::query()->where('id', Group::MEMBER_ID)->get();
                if (!empty($group)){
                    $this->user->setRelation('groups', $group);
                }
            }
        } catch (\Exception $e) {
            DzqLog::error('create_attachment',[
                'user'      => $this->user,
                'groupId'   => $groupId,
                'group'     => $group
            ]);
            return $this->outPut(ResponseCode::INTERNAL_ERROR, '??????????????????');
        }

        return call_user_func_array($typeMethodMap[$type], [$this->user]);
    }

    public function http_get_data($url) {

        $ch = curl_init ();
        curl_setopt ( $ch, CURLOPT_CUSTOMREQUEST, 'GET' );
        curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, false );
        curl_setopt ( $ch, CURLOPT_URL, $url );
        ob_start ();
        curl_exec ( $ch );
        $return_content = ob_get_contents ();
        ob_end_clean ();

        $return_code = curl_getinfo ( $ch, CURLINFO_HTTP_CODE );
        return $return_content;
    }

    public function main()
    {
        $actor = $this->user;
        $file = Arr::get($this->request->getUploadedFiles(), 'file');
        $name = Arr::get($this->request->getParsedBody(), 'name', '');
        $type = (int) Arr::get($this->request->getParsedBody(), 'type', 0);
        $dialogMessageId = (int) Arr::get($this->request->getParsedBody(), 'dialogMessageId', 0);
        $order = (int) Arr::get($this->request->getParsedBody(), 'order', 0);
        $ipAddress = ip($this->request->getServerParams());
        $mediaId = Arr::get($this->request->getParsedBody(), 'mediaId', '');
        $fileUrl = Arr::get($this->request->getParsedBody(), 'fileUrl', '');

        ini_set('memory_limit',-1);

        if (!empty($mediaId)) {
            $app = $this->offiaccount();
            $mediaFile = $app->media->get($mediaId);
            if ($mediaFile instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
                $file = $mediaFile->save(storage_path('/tmp'));
                $fileName = basename($file);
                $ext = pathinfo($file, PATHINFO_EXTENSION);
                $tmpFileWithExt = storage_path('/tmp') .'/' . $fileName;
                $imageSize = getimagesize($tmpFileWithExt);
                $fileType = $imageSize['mime'];
                $fileSize = filesize($tmpFileWithExt);
            }
        } else {
            //URL???????????????
            if (!empty($fileUrl)) {
                /*
                $return_content = $this->http_get_data($fileUrl);
                if (empty($return_content)) {
                    return $this->outPut(ResponseCode::INVALID_PARAMETER, 'URL??????');
                }
                $fileName = basename($fileUrl);
                $ext = pathinfo($fileName, PATHINFO_EXTENSION);
                $file = $tmpFileWithExt = storage_path('/tmp') .'/' . $fileName.'_'.uniqid();
                $fp = @fopen($tmpFileWithExt,"a"); //?????????????????????
                fwrite($fp,$return_content); //????????????
                $imageSize = getimagesize($tmpFileWithExt);
                $fileType = $imageSize['mime'];
                $fileSize = filesize($tmpFileWithExt);
                */
//                $url_content = file_get_contents($fileUrl);
                $url_content = $this->http_get_data($fileUrl);
                $fileName = basename($fileUrl);
                $file_basename = explode('.', $fileName);
                $file_ext = $file_basename[1];
                //??????file_ext ?????????????????? ????????? ????????????????????????
                if(strpos($file_ext, '?') !== false){
                    $file_ext = substr($file_ext, 0, strpos($file_ext, '?'));
                    $fileName = $file_basename[0].'.'.$file_ext;
                }
                $ext = $file_ext ?? '';
                $tmp_file_path = storage_path('tmp').'/'.$file_basename[0].'_'.uniqid().'.'.$ext;
                while (file_exists($tmp_file_path)){
                    $tmp_file_path = storage_path('tmp').'/'.$file_basename[0].'_'.uniqid().'.'.$ext;
                }
                $tmp_file = fopen($tmp_file_path, 'w');
                $file = $tmpFileWithExt = $real_file_path = realpath($tmp_file_path);
//                file_put_contents($real_file_path, $url_content);
                fwrite($tmp_file, $url_content);
                fclose($tmp_file);
                $fileType = mime_content_type($real_file_path);
                $fileSize = filesize($real_file_path);

            } else {
                $fileName = $file->getClientFilename();
                $fileSize = $file->getSize();
                $fileType = $file->getClientMediaType();
                $ext = pathinfo($fileName, PATHINFO_EXTENSION);
                $tmpFile = tempnam(storage_path('/tmp'), 'attachment');
                $tmpFileWithExt = $tmpFile . ($ext ? ".$ext" : '');
            }
        }

        //??????????????????????????????
        $this->validator->valid([
            'type' => $type,
            'file' => $file,
            'size' => $fileSize,
            'ext' => strtolower($ext),
        ]);
        // ??????????????????????????????????????????
        if (!$mediaId && !$fileUrl)  {
            $file->moveTo($tmpFileWithExt);
        }

        try {
            if (!$mediaId && !$fileUrl)  {
                $file = new UploadedFile(
                    $tmpFileWithExt,
                    $fileName,
                    $fileType,
                    $file->getError(),
                    true
                );
            } else {
                $file = new UploadedFile(
                    $tmpFileWithExt,
                    $fileName,
                    $fileType,
                    null,
                    true
                );
            }

            if(strtolower($ext) != 'gif'){
                $this->events->dispatch(
                    new Uploading($actor, $file)
                );
            }
            // ??????
            $this->uploader->upload($file, $type);

            $this->events->dispatch(
                new Uploaded($actor, $this->uploader)
            );

            $width = 0;
            $height = 0;
            if(in_array($type,[1,4,5])){
                list($width, $height) = getimagesize($tmpFileWithExt);
            }

            $attachment = Attachment::build(
                $actor->id,
                $type,
                $this->uploader->fileName,
                $this->uploader->getPath(),
                $name ?: $file->getClientOriginalName(),
                $file->getSize(),
                $file->getClientMimeType(),
                $this->uploader->isRemote(),
                Attachment::APPROVED,
                $ipAddress,
                $order,
                $width,
                $height
            );

            $this->events->dispatch(
                new Saving($attachment, $this->uploader, $actor)
            );

            $attachment->save();

            $this->dispatchEventsFor($attachment);
        } catch (\Exception $e) {
            DzqLog::error('create_attachment_api_error',[
                'user'  => $this->user
            ], $e->getMessage());
            $this->outPut(ResponseCode::INTERNAL_ERROR, '??????????????????', [$e->getMessage()]);
        } finally {
            @unlink($tmpFile);
            @unlink($tmpFileWithExt);
        }
        $attachmentSerializer = $this->app->make(AttachmentSerializer::class);
        $attachment = $attachmentSerializer->getDefaultAttributes($attachment);
        $data = $this->camelData($attachment);

        if (!empty($dialogMessageId)) {
            $message_text = [
                'message_text'  => null,
                'image_url'     => $data['url']
            ];
            $message_text = addslashes(json_encode($message_text));
            $updateDialogMessageResult = DialogMessage::query()
                ->where('id', $dialogMessageId)
                ->update(['attachment_id' => $data['id'], 'message_text' => $message_text, 'status' => DialogMessage::NORMAL_MESSAGE]);
            if (!$updateDialogMessageResult) {
                return $this->outPut(ResponseCode::INTERNAL_ERROR, '????????????????????????!');
            } else {
                $dialogMessage = DialogMessage::query()->where('id', $dialogMessageId)->first();
                $dialog = Dialog::query()->where('id', $dialogMessage->dialog_id)->first();
                $lastDialogMessage = DialogMessage::query()->where('id', $dialog->dialog_message_id)->first();
                if ($dialog->dialog_message_id == 0 ||
                   (isset($lastDialogMessage['created_at']) && ($lastDialogMessage['created_at'] < $dialogMessage['created_at']))) {
                    $updateDialogResult = Dialog::query()
                        ->where('id', $dialogMessage->dialog_id)
                        ->update(['dialog_message_id' => $dialogMessage->id]);
                    if (!$updateDialogResult) {
                        return $this->outPut(ResponseCode::INTERNAL_ERROR, '????????????????????????!');
                    }
                }
            }
        }

        return $this->outPut(ResponseCode::SUCCESS, '', $data);
    }
}

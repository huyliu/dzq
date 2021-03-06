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

namespace App\Api\Exceptions;

use App\Censor\CensorNotPassedException;
use App\Common\ResponseCode;
use Exception;
use Illuminate\Http\Request;
use Tobscure\JsonApi\Exception\Handler\ExceptionHandlerInterface;
use Tobscure\JsonApi\Exception\Handler\ResponseBag;
use Discuz\Common\Utils;

class CensorNotPassedExceptionHandler implements ExceptionHandlerInterface
{
    /**
     * @inheritDoc
     */
    public function manages(Exception $e)
    {
        return $e instanceof CensorNotPassedException;
    }

    /**
     * @inheritDoc
     */
    public function handle(Exception $e)
    {
        $path = Request::capture()->getPathInfo();
        if (strstr($path, 'v2')||strstr($path, 'v3')) {
            Utils::outPut(ResponseCode::CENSOR_NOT_PASSED, ResponseCode::$codeMap[ResponseCode::CENSOR_NOT_PASSED]);
            return null;
        }
        $status = $e->getCode();
        $error = [
            'status' => $status,
            'code' => $e->getMessage() ?: 'censor_not_passed',
        ];

        /** @var CensorNotPassedException $e */
        if (isset($e->getDetail()[1])) {
            $error['detail'] = $e->getDetail()[1];
        }

        return new ResponseBag($status, [$error]);
    }
}

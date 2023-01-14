<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class BaseController extends Controller
{
    //
    public function sendResponse($result,$message){
        return response()->json([
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ], Response::HTTP_OK);
    }
    public function sendError($error, $errorMessages = [])
    {
    	$response = [
            'success' => false,
            'message' => $error,
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }
        return response()->json([
            $response
        ],Response::HTTP_NOT_FOUND);
    }

}

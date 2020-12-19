<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\User;
use \App\Api_config;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PushController extends Controller
{
    protected $serverKey;

    public function __construct()
    {
        $config = Api_config::find(1);

        $this->serverKey =  $config->serverKey;
    }

    public function saveToken(Request $request)
    {
        try {
            $user = User::find(Auth::id());

            $user->device_token = $request->fcm_token;
            $user->save();

            return ['message' => 'Token actualizado', 'type' => 'success'];
        } catch (\Throwable $th) {
            return  ['message' => $th->getMessage(), 'type' => 'error'];
        }
    }

    public function sendPush(Request $request)
    {

        try {

            $user = User::find(Auth::id());
            //dd($user);
            //dd( $this->serverKey);
            $data = [
                "to" => $user->device_token,
                "notification" =>
                [
                    "title"     => $request->title,
                    "body"      => $request->body,
                    "icon"      => '/img/icon-logo.png'
                ],
            ];
            $dataString = json_encode($data);

            $headers = [
                'Authorization: key=' . $this->serverKey,
                'Content-Type: application/json',
            ];

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);

            $response = curl_exec($ch);

            return $response;
        } catch (\Throwable $th) {
            return  ['message' => $th->getMessage(), 'type' => 'error'];
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Message;
use App\User;
use Illuminate\Support\Facades\Auth;

use App\Events\MessageSentEvent;

class MessageController extends Controller
{
    public function __construct()
    {
        //   $this->middleware('auth');
    }

    public function index()
    {
        return Message::with('user')->get();
    }


    public function store(Request $request)
    {
        try {
            $user = Auth::user();



            $message = $user->messages()->create([
                'message' => $request->input('message')
            ]);

            broadcast(new MessageSentEvent($message, $user))->toOthers();
        } catch (\Throwable $th) {
            //    return $th->getMessage();
            return 'error';
        }

        return [
            'message' => $message,
            'user' => $user,
        ];
    }
}

/*
     public function store(Request $request)
{
    
    $user = Auth::user();

    return $user;
    

    $message = $user->messages()->create([
        'message' => $request->input('message')
    ]);

    // send event to listeners
    broadcast(new MessageSentEvent($message, $user))->toOthers();

    return [
        'message' => $message,
        'user' => $user,
    ];

}
 */
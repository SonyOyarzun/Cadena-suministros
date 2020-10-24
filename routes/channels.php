<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

/*
Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
*/
Broadcast::channel('meter', function () {
    return true;
});

/*
Broadcast::channel('chat', function () {
    return \Illuminate\Support\Facades\Auth::check();
});
*/
//https://larasocket.com/projects/cadena-de-suministros

//https://medium.com/@zachvv11/building-a-real-time-chat-application-with-laravel-and-larasocket-c3e377537dc2

//279|16uN1IyYWiJtXQvESm9MqLO0alccB2mlCKxEjYQc6qBetU8j3565niIqCYnC3136Xt8q5UsadNvq6fka

//https://code.i-harness.com/es/docs/laravel~5.6/docs/5.6/broadcasting
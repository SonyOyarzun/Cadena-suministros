<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Auth;

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
Broadcast::channel('meter.'.Auth::id(), function ($userId) {
    return true;
});

/*
Broadcast::channel('chat', function () {
    return \Illuminate\Support\Facades\Auth::check();
});

Broadcast::channel('meter', function ($user) {
    return (int) $user->id === (int) Auth::id();
});
*/

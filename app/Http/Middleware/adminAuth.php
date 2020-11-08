<?php

namespace App\Http\Middleware;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

use Illuminate\Support\Facades\Auth;
use App\User;

use Closure;

class adminAuth extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    protected function redirectTo($request)
    {
        $id = Auth::id();
        $user = User::findOrFail($id);

        if (!($user->role=='A')) {
            return route('/');
        }
    }
}

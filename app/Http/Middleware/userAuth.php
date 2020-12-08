<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

use Illuminate\Support\Facades\Auth;
use App\User;
use Closure;

class userAuth extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {
        $id = Auth::id();
        $user = User::findOrFail($id);

        if (!($user->role=='A') || !($user->role=='U')) {
            abort(403, "¡Debe Autentificarse Primero!");
        }
        return $next($request);
    }
}

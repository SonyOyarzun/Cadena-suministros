<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use App\User;

use Closure;

class adminAuth 
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

        if (!($user->role=='A')) {
            abort(403, "¡No tienes suficientes permisos!");
        }
        return $next($request);
    }
}

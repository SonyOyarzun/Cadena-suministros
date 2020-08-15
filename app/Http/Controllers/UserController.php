<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
       $users=
               DB::table('users')
                ->get();
        
           return json_encode($users);

    }
}

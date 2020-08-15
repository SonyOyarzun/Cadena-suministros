<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    public function index()
    {
       $usuarios=
               DB::table('users')
                ->get();
        
           return json_encode($usuarios);

    }
}

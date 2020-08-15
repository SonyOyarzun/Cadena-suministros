<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = array(
            'Sony',
            'Oyarzun'
            
        );
        
           return json_encode($usuarios);
        
        
    }
}

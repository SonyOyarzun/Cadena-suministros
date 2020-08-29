<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use App\Chain;

class ChainController extends Controller
{
    public function index()
    {
		$chain = Chain::get();

		return $chain;

    }
    
    public function create(Request $request)
    {
            $id=Auth::id();

            $chain = new Chain;
            $chain->transaction = $request->transaction;
            $chain->from        = $id;
            $chain->to          = $request->to;
            $chain->state       = 'Enviado';
            $chain->created_at = now();
            $chain->updated_at = now();
            $chain->save();
            return "Transaccion Creada";
         
    }

}

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
        
            $chain = new Chain;
            $chain->transaction = $request->id_transaction;
            $chain->from        = $request->from;
            $chain->to          = $request->to;
            $chain->created_at = now();
            $chain->updated_at = now();
            $chain->save();
            return "Transaccion Creada";
         
    }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use App\Chain;
use App\User;

class ChainController extends Controller
{
    public function index()
    {
    $chain = Chain::get();

    $send  = [];
    foreach($chains as $chain){

    $from = User::findOrFail($chain->from);
    $to   = User::findOrFail($chain->from);

    $send = [
      "id"          => $chain->id,
      "transaction" => $chain->id,
      "from"        => $chain->id,
      "to"          => $chain->id,
      "state"       => $chain->id,
      "updated_at"  => User::findOrFail($chain->from),
      "created_at"  => User::findOrFail($chain->to),
    ];
    }

   
   

		return 

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

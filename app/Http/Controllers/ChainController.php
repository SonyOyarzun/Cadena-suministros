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


  $chains = Chain::addSelect('k')->get();

 // $chains->addSelect('h');

  $from = Chain::select('name')
      ->join('users','users.id','=','chain.from')
      ->get();
  $to = Chain::select('name')
      ->join('users','users.id','=','chain.to')
      ->get();

   
 
    return $chains;

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

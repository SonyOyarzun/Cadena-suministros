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
    try {

      $chains = Chain::addSelect([
        'fromName' =>
        User::select('name')
          ->whereColumn('chain.from', 'users.id'),
        'toName' =>
        User::select('name')
          ->whereColumn('chain.to', 'users.id'),
      ])->get();
      
    } catch (\Throwable $th) {

      return $th;
    }
    return $chains;
  }

  public function create(Request $request)
  {
    $id = Auth::id();

    $chain = new Chain;
    $chain->transaction     = $request->transaction;
    $chain->prevTransaction = $request->transaction;
    $chain->from        = $id;
    $chain->to          = $request->to;
    $chain->state       = 'Enviado';
    $chain->created_at = now();
    $chain->updated_at = now();
    $chain->save();
    return "Transaccion Creada";
  }

  public function receive(Request $request)
  {
    $id = Auth::id();

    Chain::query()
    ->where('transaction','=',$request->transaction)
    ->update(['state'=>'Recibido']);
    
    $chain = new Chain;
    $chain->transaction     = $request->transaction;
    $chain->prevTransaction = $request->prevTransaction;
    $chain->from        = $request->from;
    $chain->to          = $id;
    $chain->state       = 'Recibido';
    $chain->created_at = now();
    $chain->updated_at = now();
    $chain->save();
    
    return "Transaccion Recibida";
  }
}

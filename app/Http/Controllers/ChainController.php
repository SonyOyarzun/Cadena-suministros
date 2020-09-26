<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

use App\Mail\DemoEmail;
use Illuminate\Support\Facades\Mail;


use App\Api_config;
use App\Chain;
use App\User;

class ChainController extends Controller
{
  public function index()
  {
    try {

      $id = Auth::id();

      $chains = Chain::addSelect([
        'fromName' =>
        User::select('name')
          ->whereColumn('chain.from', 'users.id'),
        'toName' =>
        User::select('name')
          ->whereColumn('chain.to', 'users.id'),
      ])->where('to', '=', $id)->get();
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
    $chain->prevTransaction = $request->prevTransaction;
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
    /*
    Chain::query()
      ->where('transaction', '=', $request->prevTransaction)
      ->update(['state' => 'Transferido']);

    $chain = new Chain;
    $chain->transaction     = $request->transaction;
    $chain->prevTransaction = $request->prevTransaction;
    $chain->from        = $request->from;
    $chain->to          = $id;
    $chain->state       = 'Recibido';
    $chain->created_at = now();
    $chain->updated_at = now();
    $chain->save();
*/
    try {

      $api = Api_config::findOrFail(1);

      $userToTranfer   = User::findOrFail($request->from);
      $receiver = User::findOrFail($id);

      $objDemo = new \stdClass();
      $objDemo->transaction  = $request->transaction;
      $objDemo->date  = date('d-m-yy');
      $objDemo->toTranfer = $userToTranfer->name;
      $objDemo->receiver  = $receiver->name;
      $objDemo->logotype  = $api->logotype;
      $objDemo->background= $api->background;

      Mail::to("sony.oyarzun@gmail.com")->send(new DemoEmail($objDemo));
      
    } catch (\Throwable $th) {
     // throw $th;
     return $th->getMessage();
    }
    return "Transaccion Recibida";
  }

  public function reSend(Request $request)
  {
    $id = Auth::id();
    try {
      Chain::query()
        ->where('transaction', '=', $request->transaction)
        ->update([
          'state'  => 'Enviado',
          'from'   => $id,
          'to'     => $request->to
        ]);
    } catch (\Throwable $th) {
      return $th->getMessage();
    }
    return "Transaccion Reenviada";
  }
}



//php artisan make:mail DemoEmail
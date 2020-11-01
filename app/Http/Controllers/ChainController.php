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

use App\Events\NotificationEvent;

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
      ])->where('to', '=', $id)->orWhere('from', '=', $id)->orderBy('updated_at','DESC')->orderBy('state','DESC')->get();
    } catch (\Throwable $th) {

      return $th;
    }
    return $chains;
  }

  public function create(Request $request)
  {
    try {
      $id = Auth::id();

      $chain = new Chain;
      $chain->transaction = $request->transaction;
      $chain->asset       = $request->asset;
      $chain->from        = $id;
      $chain->to          = $request->to;
      $chain->commentary  = 'Inicio2';
      //$chain->state       = 'Enviado';
      $chain->state       = 'Rechazado';
      $chain->created_at = now();
      $chain->updated_at = now();
      $chain->save();

      $index = [$this->index()];

      broadcast(new NotificationEvent($index));
      return ['message'=>'Transaccion Creada','type'=>'success'];

    } catch (\Throwable $th) {
       return ['message'=>'Error en Transaccion','type'=>'error'];
    }
  


  }

  public function receive(Request $request)
  {
    $id = Auth::id();

    try {

      Chain::query()
        ->where('transaction', '=', $request->transaction)
        ->update(['state' => 'Transferido']);

      $chain = new Chain;
      $chain->transaction = $request->transaction;
      $chain->asset       = $request->asset;
      $chain->from        = $request->from;
      $chain->to          = $id;
      $chain->state       = $request->state;
      $chain->created_at = now();
      $chain->updated_at = now();
      $chain->save();

      $api = Api_config::findOrFail(1);

      $userToTranfer   = User::findOrFail($id);
      $receiver = User::findOrFail($request->from);

      $objDemo = new \stdClass();
      $objDemo->transaction = $chain->asset;
      $objDemo->date        = date('d-m-yy');
      $objDemo->state       = $chain->state;
      $objDemo->toTransfer  = $userToTranfer->name;
      $objDemo->receiver    = $receiver->name;
      $objDemo->logotype    = $api->logotype;
      $objDemo->background  = $api->background;

      Mail::to($receiver->email)->send(new DemoEmail($objDemo));
    } catch (\Throwable $th) {
      // throw $th;
      return ['message'=>'Error al Actualizar Transaccion','type'=>'error'];
    }

    $index = [$this->index()];

    broadcast(new NotificationEvent($index));
    return ['message'=>'Transaccion Actualizar','type'=>'success'];
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
      return ['message'=>'Error al Reenviar Transaccion','type'=>'error'];
    }

    return ['message'=>'Transaccion Reenviada','type'=>'success'];
  }
}



//php artisan make:mail DemoEmail
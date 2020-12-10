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
      ])->where('to', '=', $id)->orWhere('from', '=', $id)->orderBy('updated_at', 'DESC')->orderBy('state', 'DESC')->get();
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
      $chain->commentary  = '';
      $chain->state       = 'Enviado';
      $chain->view        = 0;
      $chain->created_at = now();
      $chain->updated_at = now();
      $chain->save();

      return ['message' => 'Transaccion Creada', 'type' => 'success'];
    } catch (\Throwable $th) {
      return ['message' => 'Error en Transaccion', 'type' => 'error'];
    } finally {
      $index = [$this->index()];
      broadcast(new NotificationEvent($index));
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
      $chain->transaction = $request->newTransaction;
      $chain->asset       = $request->asset;
      $chain->from        = $request->from;
      $chain->to          = $id;
      $chain->state       = $request->state;
      $chain->commentary  = $request->commentary;
      $chain->view        = 3;
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
      return ['message' => $th->getMessage(), 'type' => 'error'];
    } finally {
      $index = [$this->index()];
      broadcast(new NotificationEvent($index));
    }
    return ['message' => "Producto $chain->state", 'type' => 'success'];
  }

  public function terminate(Request $request)
  {
    $id = Auth::id();

    try {

      Chain::query()
        ->where('transaction', '=', $request->transaction)
        ->update(['state' => 'Terminado']);

      $api = Api_config::findOrFail(1);

      $userToTranfer   = User::findOrFail($id);
      $receiver = User::findOrFail($request->from);

      $objDemo = new \stdClass();
      $objDemo->transaction = $request->asset;
      $objDemo->date        = date('d-m-yy');
      $objDemo->state       = $request->state;
      $objDemo->toTransfer  = $userToTranfer->name;
      $objDemo->receiver    = $receiver->name;
      $objDemo->logotype    = $api->logotype;
      $objDemo->background  = $api->background;

      Mail::to($receiver->email)->send(new DemoEmail($objDemo));
    } catch (\Throwable $th) {
      // throw $th;
      return ['message' => $th->getMessage(), 'type' => 'error'];
    } finally {
      $index = [$this->index()];
      broadcast(new NotificationEvent($index));
    }
    return ['message' => "Producto $chain->state", 'type' => 'success'];
  }

  public function reSend(Request $request)
  {
    $id = Auth::id();
    try {

      if (!isset($request->to)) {
        return ['message'=>'Debe ingresar destinatario','type'=>'error'];
      } elseif (!isset($request->email)) {
      Chain::query()
        ->where('transaction', '=', $request->transaction)
        ->update([
          'state'  => 'Enviado',
          'from'   => $id,
          'to'     => $request->to,
          'view'   => 0
        ]);
      }
    } catch (\Throwable $th) {
      return ['message' => 'Error al Reenviar Transaccion', 'type' => 'error'];
    } finally {
      $index = [$this->index()];
      broadcast(new NotificationEvent($index));
    }

    return ['message' => 'Transaccion Reenviada', 'type' => 'success'];
  }



  public function viewNotification()
  {

    try {
      $id = Auth::id();

      Chain::query()
        ->where([['to', '=', $id], ['view', '!=', 3]])->orWhere([['from', '=', $id], ['view', '=', 3]])
        ->update([
          'view'  => 1,
        ]);
    } catch (\Throwable $th) {
      return ['message' => 'Error al Ver Notificacion', 'type' => 'error'];
    }

    return ['message' => 'Notificaciones Vistas', 'type' => 'success'];
  }
}




//php artisan make:mail DemoEmail
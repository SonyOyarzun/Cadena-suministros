<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Api_config;

class ApiController extends Controller
{

	public function product(Request $request)
	{
		try {
			$client = new Client();
			$response = $client->request('GET', $request->path);
			$statusCode = $response->getStatusCode();
			$body = $response->getBody()->getContents();
		} catch (\Exception $e) {
			return json_encode($e);
		}
		return $body;
	}

	public function myProduct()
	{
		$id = Auth::id();
		$user = User::findOrFail($id);

		if ($user != null) {

			try {
				$client = new Client();
				$response = $client->request('GET', $user->path);
				$statusCode = $response->getStatusCode();
				$body = $response->getBody()->getContents();
			} catch (\Exception $e) {
				return json_encode($e);
			}
			return $body;
		} else {
			return json_encode("Usuario Desconocido");
		}
	}

	public function config()
	{
		$api = Api_config::get();

		return $api;
	}

	public function editConfig(Request $request)
	{
		
		try {
			$api = Api_config::findOrFail($request->id);

		if ($api == null) {
			return ['message'=>'Api no encontrada','type'=>'error'];
		} else {

			if (!isset($request->path)) {
				return ['message'=>'Debe ingresar ruta de api','type'=>'error'];
			} elseif (!isset($request->transaction)) {
				return ['message'=>'Debe ingresar ruta de transaction','type'=>'error'];
			} elseif (!filter_var($request->asset)) {
				return "Debe ingresar ruta de asset";
				return ['message'=>'Debe ingresar nombre','type'=>'error'];
			} elseif (!isset($request->api_port)) {
				return ['message'=>'Debe ingresar puerto de api','type'=>'error'];
			} elseif (!isset($request->db_port)) {
				return ['message'=>'Debe ingresar puerto de db','type'=>'error'];
			} elseif (!isset($request->mailer)) {
				return ['message'=>'Debe ingresar mailer','type'=>'error'];
			} elseif (!filter_var($request->host)) {
				return ['message'=>'Debe ingresar host','type'=>'error'];
			} elseif (!isset($request->port)) {
				return ['message'=>'Debe ingresar puerto de servidor de correo','type'=>'error'];
			} elseif (!isset($request->user)) {
				return ['message'=>'Debe ingresar usuario','type'=>'error'];
			} elseif (!isset($request->pass)) {
				return ['message'=>'Debe ingresar contraseña','type'=>'error'];
			} elseif (!isset($request->encryption)) {
				return ['message'=>'Debe ingresar encriptación','type'=>'error'];
			} elseif (!isset($request->from)) {
				return ['message'=>'Debe ingresar remitente','type'=>'error'];
			} elseif (!filter_var($request->fromName)) {
				return ['message'=>'Debe ingresar nombre de remitente','type'=>'error'];
			} elseif (!isset($request->apiKey)) {
				return ['message'=>'Debe ingresar api key','type'=>'error'];
			} elseif (!isset($request->authDomain)) {
				return ['message'=>'Debe ingresar auth domain','type'=>'error'];
			} elseif (!isset($request->databaseURL)) {
				return ['message'=>'Debe ingresar data base url','type'=>'error'];
			} elseif (!isset($request->projectId)) {
				return ['message'=>'Debe ingresar project id','type'=>'error'];
			} elseif (!isset($request->storageBucket)) {
				return ['message'=>'Debe ingresar storage bucket','type'=>'error'];
			} elseif (!filter_var($request->messagingSenderId)) {
				return ['message'=>'Debe ingresar messaging sender id','type'=>'error'];
			} elseif (!isset($request->appId)) {
				return ['message'=>'Debe ingresar app id','type'=>'error'];
			} elseif (!isset($request->measurementId)) {
				return ['message'=>'Debe ingresar measurement Id','type'=>'error'];
			} else {

				//api
				$api->path  		= $request->path;
				$api->transaction  	= $request->transaction;
				$api->asset  		= $request->asset;
				$api->api_port  	= $request->api_port;
				$api->db_port  		= $request->db_port;

				//correo
				$api->mailer  		= $request->mailer;
				$api->host  		= $request->host;
				$api->port  		= $request->port;
				$api->user  		= $request->user;
				$api->pass  		= $request->pass;
				$api->encryption  	= $request->encryption;
				$api->from  		= $request->from;
				$api->fromName  	= $request->fromName;


				//firebase
				$api->apiKey  		= $request->apiKey;
				$api->authDomain  	= $request->authDomain;
				$api->databaseURL  	= $request->databaseURL;
				$api->projectId  	= $request->projectId;
				$api->storageBucket = $request->storageBucket;
				$api->messagingSenderId = $request->messagingSenderId;
				$api->appId  		= $request->appId;
				$api->measurementId = $request->measurementId;

				$api->save();

				return ['message'=>'Api Actualizada','type'=>'success'];
			}
		}
		} catch (\Throwable $th) {
			return ['message'=>$th->getMessage(),'type'=>'error'];
		}

		

		
	}
}

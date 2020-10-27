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
		$api = Api_config::findOrFail($request->id);
		if ($api == null) {

			return 'Api no encontrada';
		} else {

			if (!isset($request->path)) {
				return "Debe ingresar ruta de api";
			} elseif (!isset($request->transaction)) {
				return "Debe ingresar ruta de transaction";
			} elseif (!filter_var($request->asset)) {
				return "Debe ingresar ruta de asset";
			} elseif (!isset($request->api_port)) {
				return "Debe ingresar puerto de api";
			} elseif (!isset($request->db_port)) {
				return "Debe ingresar puerto de db";
			} elseif (!isset($request->logotype)) {
				return "Debe ingresar ruta de logo";
			} elseif (!isset($request->background)) {
				return "Debe ingresar ruta de fondo";
			} else {

				$api->path  		= $request->path;
				$api->transaction  	= $request->transaction;
				$api->asset  		= $request->asset;
				$api->api_port  	= $request->api_port;
				$api->db_port  		= $request->db_port;

				$api->save();

				return "Api Actualizada";

			}
		}
	}
}

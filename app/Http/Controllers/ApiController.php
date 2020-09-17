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
		$api = Api_config::get();
		if ($api == null) {

			return 'Api no encontrada';
		} else {

			if (!isset($request->path)) {
				return "Debe ingresar ruta";
			} elseif (!isset($request->transaction)) {
				return "Debe ingresar ruta de transaction";
			} elseif (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
				return "Formato mail no valido";
			} elseif (!isset($request->role)) {
				return "Debe ingresar role";
			} elseif (!isset($request->path)) {
				return "Debe ingresar ruta de api";
			} else {

				$user->name  = $request->name;
				$user->email = $request->email;
				$user->role  = $request->role;
				$user->path  = $request->path;
				$user->save();

				return "Usuario Actualizado";
			}
		}
	}
}


/*
http://becasbeneficios.ugm.cl/service.php?acceso_alumno=189567391 

http://becasbeneficios.ugm.cl/service.php?informacion_basica=189567391 

http://becasbeneficios.ugm.cl/service.php?carreras_programas=189567391  

controlador modelo y migration
php artisan make:model ModelName -m -cr 

https://www.itechempires.com/2019/09/complete-guide-of-using-laravel-6-eloquent-subquery-enhancements/

php artisan migrate:refresh --seed

https://medium.com/@vchaurasia95/basic-operations-in-bigchaindb-using-js-eb530216eaa7

https://www.itsolutionstuff.com/post/react-form-validation-tutorial-exampleexample.html

*/
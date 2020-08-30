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
	
	try{		
    	$client = new Client();
		$response = $client->request('GET', $request->path);
    	$statusCode = $response->getStatusCode();
		$body = $response->getBody()->getContents();
	}catch(\Exception $e){
		return json_encode($e);
	}
		return $body;

	}

	public function myProduct()
    {
		$id=Auth::id();
		$user = User::findOrFail($id);
		
	if($user!=null){	

	try{		
    	$client = new Client();
		$response = $client->request('GET', $user->path);
    	$statusCode = $response->getStatusCode();
		$body = $response->getBody()->getContents();
	}catch(\Exception $e){
		return json_encode($e);
	}
		return $body;

	}else{
		return json_encode("Usuario Desconocido");
	}

	}

	public function config()
    {
		$api = Api_config::get();

		return $api;

	}

	public function editConfig()
    {
		$api = Api_config::get();

		return $api;

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

*/
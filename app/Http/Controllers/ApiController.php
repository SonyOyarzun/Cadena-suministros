<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ApiController extends Controller
{
	
    public function index(Request $request)
    {
	
	try{		
    	$client = new Client();
		$response = $client->request('GET', $request->path);
    	$statusCode = $response->getStatusCode();
		$body = $response->getBody()->getContents();
	}catch(\Exception $e){
		return $e;
	}
		return $body;

	}
	


}


/*
http://becasbeneficios.ugm.cl/service.php?acceso_alumno=189567391 

http://becasbeneficios.ugm.cl/service.php?informacion_basica=189567391 

http://becasbeneficios.ugm.cl/service.php?carreras_programas=189567391  

*/
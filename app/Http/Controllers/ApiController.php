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
	//	$response = $client->request('GET', $request->path);
	
	//    $response = $client->request('GET','http://datos.gob.cl/api/action/datastore_search?resource_id=a60f93af-6a8a-45b6-85ff-267f5dd37ad6&limit=1');
	$response = $client->request('GET','http://becasbeneficios.ugm.cl/service.php?carreras_programas=189567391');
    	$statusCode = $response->getStatusCode();
		$body = $response->getBody()->getContents();
	}catch(\Exception $e){
		return $e;
	}
		return $body;
    }
}
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
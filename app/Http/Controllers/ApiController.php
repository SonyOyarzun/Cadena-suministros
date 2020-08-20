<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ApiController extends Controller
{
    public function index(Request $request)
    {
    	$client = new Client();
    	$response = $client->request('GET', 'http://datos.gob.cl/api/action/datastore_search?resource_id=a60f93af-6a8a-45b6-85ff-267f5dd37ad6&limit=1');
    	$statusCode = $response->getStatusCode();
    	$body = $response->getBody()->getContents();

    	return $body;
    }
}
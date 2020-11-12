<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

class BigController extends Controller
{

	public function asset(Request $request)
	{

		try {
			$client = new Client();
			$response = $client->request('GET', 'https://test.ipdb.io/api/v1/transactions?asset_id=' . $request->asset . '&operation=TRANSFER&last_tx=false');
			$statusCode = $response->getStatusCode();
			$body = $response->getBody()->getContents();
		} catch (\Exception $e) {
			return ['message'=>$e->getMessage(),'type'=>'error'];
		}
		return $body;
	}

	public function transaction(Request $request)
	{

		try {
			$client = new Client();
			$response = $client->request('GET', 'https://test.ipdb.io/api/v1/transactions/' . $request->asset);
			$statusCode = $response->getStatusCode();
			$body = $response->getBody()->getContents();
		} catch (\Exception $e) {
			return ['message'=>$e->getMessage(),'type'=>'error'];
		}
		return $body;
	}

	public function search(Request $request)
	{

		try {

			if (!isset($request->attribute)) {
				return ['message'=>'Debe ingresar parametro','type'=>'error'];
			  }else{
				$client = new Client();
				$response = $client->request('GET', 'https://test.ipdb.io/api/v1/assets/?search=' . $request->attribute);
				$statusCode = $response->getStatusCode();
				$body = $response->getBody()->getContents();
			  }
		
		} catch (\Exception $e) {
			return ['message'=>'Producto no encontrado','type'=>'error'];
		}
			return $body;	
	}


	public function trace(Request $request)
	{

		try {
			$client = new Client();
			$response = $client->request('GET', 'https://test.ipdb.io/api/v1/transactions?asset_id=' . $request->asset . '&operation=TRANSFER&last_tx=false');
			$statusCode = $response->getStatusCode();
			$body = $response->getBody()->getContents();

			$client2 = new Client();
			$response2 = $client2->request('GET', 'https://test.ipdb.io/api/v1/transactions/' . $request->asset);
			$statusCode2 = $response2->getStatusCode();
			$body2 = $response2->getBody()->getContents();
		} catch (\Exception $e) {
	
			return ['message'=>$e->getMessage(),'type'=>'error'];
		}
		return $body+$body2;
	}
}

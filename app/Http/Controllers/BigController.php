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
			$response = $client->request('GET', 'https://test.ipdb.io/api/v1/transactions?asset_id='.$request->asset.'&operation=TRANSFER&last_tx=false');
			$statusCode = $response->getStatusCode();
			$body = $response->getBody()->getContents();
		} catch (\Exception $e) {
			//return json_encode($e->getMessage());
			return $e->getMessage();
		}
			return $body;
	}
}

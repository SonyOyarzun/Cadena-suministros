<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use GuzzleHttp\Client;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Api_config;

class UploadController extends Controller
{

	public function uploadFileLogotype(Request $request)
	{

		try {

			$validation = $request->validate([
				'file'  =>  'required|file|image|mimes:jpeg,png,gif,jpg|max:2048'
			]);

			$file = $validation['file'];


			// Generate a file name with extension
			//	$fileName = 'profile-'.time().'.'.$file->getClientOriginalExtension();
			$fileName = 'logo.' . $file->getClientOriginalExtension();

			// Save the file
			$path = $file->storeAs('public/images', $fileName);

			$api = Api_config::findOrFail(1);
			$api->logotype  	= $fileName;
			$api->save();

	//		return 'Logo cargado';

			return $api;

		} catch (\Throwable $th) {
			return $th;
		}
	}

	public function uploadFileBackground(Request $request)
	{

		try {

			$validation = $request->validate([
				'file'  =>  'required|file|image|mimes:jpeg,png,gif,jpg|max:2048'
			]);

			$file = $validation['file'];


			// Generate a file name with extension
			//	$fileName = 'profile-'.time().'.'.$file->getClientOriginalExtension();
			$fileName = 'background.' . $file->getClientOriginalExtension();

			// Save the file
			$path = $file->storeAs('public/images', $fileName);

			$api = Api_config::findOrFail(1);
			$api->background  	= $fileName;
			$api->save();

		
		//	return 'Fondo cargado';
			return $api;

			//dd($path);


		} catch (\Throwable $th) {
			return $th;
		}
	}
}

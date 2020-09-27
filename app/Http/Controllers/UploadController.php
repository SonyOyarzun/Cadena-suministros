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

	public function uploadFile(Request $request)
	{

		try {
			$validation = $request->validate([
				'file'  =>  'required|file|image|mimes:jpeg,png,gif,jpg|max:2048'
			]);
		
			
			$file = $validation['file'];
		
			
			// Generate a file name with extension
		//	$fileName = 'profile-'.time().'.'.$file->getClientOriginalExtension();
			$fileName = 'logo.'.$file->getClientOriginalExtension();
		
			// Save the file
			$path = $file->storeAs('files', $fileName);
		
			//dd($path);

			
			return $fileName;

		} catch (\Throwable $th) {
			return $th;
		}

		return 'Archivo Cargado';
	}
}

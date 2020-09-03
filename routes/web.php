<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', function () {
    return view('home');
});


Auth::routes();

Route::get('/user/my/', 'UserController@my');
Route::get('/user/search/', 'UserController@search');
Route::get('/user/list/', 'UserController@index');  
Route::put('/user/edit/', 'UserController@update');  
Route::put('/user/pass/', 'UserController@changePass');  
Route::post('/user/new/', 'UserController@create');  
Route::delete('/user/delete/', 'UserController@delete');  

Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::group(['middleware' => ['cors']], function () {
    //Rutas a las que se permitirá acceso
});

//rutas api
Route::get('json-api', 'ApiController@product');
Route::get('json-api/my', 'ApiController@myProduct');
Route::get('json-api/config', 'ApiController@config');


//rutas complemento de bigchain
Route::get('chain/list', 'ChainController@index');
Route::post('chain/new', 'ChainController@create');

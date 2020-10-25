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
//Broadcast::routes();
Auth::routes();


Route::get('/', function () {
    return view('home');
});

Route::get('/home', function () {
    return view('home');
});

//Rutas de Componentes React
Route::get('/Search',function () {
    return view('home');
});
Route::get('/Trace',function () {
    return view('home');
});
Route::get('/Trace/{asset}',function () {
    return view('home');
});

Route::get('/Reset/{email}/{token}',function () {
    return view('home');
});

Route::get('/Forgot',function () {
    return view('home');
});

/*
Route::view('/{path?}', 'home')
     ->where('path', '.*')
     ->name('home');

*/



Route::get('/user/my/', 'UserController@my');
Route::post('/user/search/', 'UserController@search');
Route::get('/user/list/', 'UserController@list');  
Route::put('/user/edit/', 'UserController@edit');  
Route::put('/user/changePass/', 'UserController@changePass');  
Route::post('/user/new/', 'UserController@new');  
Route::delete('/user/delete/', 'UserController@delete');  

//custom laravel access
Route::post('/user/login/', 'UserController@userLogin');  


Route::post('reset_password_without_token', 'AccountsController@validatePasswordRequest');
Route::post('reset_password_with_token', 'AccountsController@resetPassword');
//https://medium.com/@victorighalo/custom-password-reset-in-laravel-21e57816989f



Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::group(['middleware' => ['cors']], function () {
    //Rutas a las que se permitirá acceso
});

//rutas api
Route::post('/api-product', 'ApiController@product');
Route::get('/api-myProduct', 'ApiController@myProduct');
Route::get('/api-config', 'ApiController@config');
Route::put('/api-editConfig', 'ApiController@editConfig');


//rutas complemento de bigchain
Route::get('/chain/list', 'ChainController@index');
Route::post('/chain/new', 'ChainController@create');
Route::post('/chain/receive', 'ChainController@receive');
Route::post('/chain/reSend', 'ChainController@reSend');

//rutas de bigchain
Route::post('/assets', 'BigController@asset');
Route::post('/transaction', 'BigController@transaction');
Route::post('/search', 'BigController@search');

//subir archivo
Route::post('/uploadLogotype', 'UploadController@uploadFileLogotype');
Route::post('/uploadBackground', 'UploadController@uploadFileBackground');

//rutas meter
Route::get('/meter/list', 'MeterController@index');
Route::post('/meter/new', 'MeterController@create');


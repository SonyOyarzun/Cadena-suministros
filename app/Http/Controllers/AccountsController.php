<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//reemplazado por validaciones propias creadas en ValidateFormRequest
//use App\Http\Requests\NewUserRequest;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator, Redirect, Response;
use Session;

use App\User;
use App\Api_config;
use App\Password;

use PhpParser\Node\Stmt\TryCatch;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use Illuminate\Support\Str;

use App\Mail\ForgotPassEmail;
use App\Mail\ResetSuccessPassEmail;
use Illuminate\Support\Facades\Mail;


class AccountsController extends Controller
{
  public function validatePasswordRequest(Request $request)
  {
    try {
      $user =  User::where("email", $request->email)->first();

      if (!$user) {
        return ['message'=>'Mail no registrado','type'=>'error'];
      }

      $cadena =  Str::random(60);
      $resultado = str_replace("/", "0", $cadena);

      $passwordReset = new Password;
      $passwordReset->email = $request->email;
      $passwordReset->token = $resultado;
      $passwordReset->save();

      $tokenData = Password::where('email', $request->email)->first();

      if ($this->sendResetEmail($request->email, $tokenData->token)) {
        return ['message'=>'Se ha enviado un enlace por correo para restablecer contraseña','type'=>'success'];
      } else {
        return ['message'=>'Error al enviar correo','type'=>'error'];
      }

    } catch (\Throwable $th) {
      return ['message'=>'Error al enviar correo','type'=>'error'];
    }

  }

  private function sendResetEmail($email, $token)
  {
    try {
      $user = User::where("email", $email)->first();

      $link = url('/Reset') . '/' . urlencode($user->email) . '/' . $token;

      $api = Api_config::findOrFail(1);

      $objDemo = new \stdClass();
      $objDemo->receiver  = $user->name;
      $objDemo->url       = $link;
      $objDemo->logotype  = asset('storage/images/' . $api->logotype);

      Mail::to($email)->send(new ForgotPassEmail($objDemo));

      return true;
    } catch (\Exception $e) {
      return false;
    }
  }

  private function successResetEmail($email)
  {
    try {
      $user = User::where("email", $email)->first();
      $api = Api_config::findOrFail(1);

      $objDemo = new \stdClass();
      $objDemo->receiver  = $user->name;
      $objDemo->url  = url('/');
      $objDemo->logotype  = asset('storage/images/' . $api->logotype);

      Mail::to($user->email)->send(new ResetSuccessPassEmail($objDemo));

      return true;
    } catch (\Exception $e) {
      return false;
    }
  }

  public function resetPassword(Request $request)
  {

    if (!isset($request->email)) {
      return ['message'=>'Debe ingresar mail','type'=>'error'];
    } elseif (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
      return ['message'=>'Formato mail no valido','type'=>'error'];
    } elseif (!User::where('email', $request->email)->exists()) {
      return ['message'=>'Mail ya existe en los registros','type'=>'error'];
    } elseif (!isset($request->password)) {
      return ['message'=>'Debe ingresar contraseña','type'=>'error'];
    } elseif (!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,12}$/', $request->password)) {
      return ['message'=>'Contraseña debe Contener: Mayúsculas, números y mas de 8 carácteres','type'=>'error'];
    } elseif ($request->password != $request->confirmPassword) {
      return ['message'=>'Contraseñas no coinciden','type'=>'error'];
    } else {

      $tokenData = Password::where('token', $request->token)->first();

      if (!$tokenData) return ['message'=>'Token no coincide','type'=>'error'];

      $user = User::where('email', $tokenData->email)->first();

      if (!$user) return ['message'=>'Email no encontrada','type'=>'error'];

      $user->password = bcrypt($request->password);
      $user->update(); 

      Auth::login($user);

      Password::where('email', $user->email)->delete();

      if ($this->successResetEmail($request->email)) {
        return ['message'=>'Contraseña Restablecida','type'=>'success'];
      } else {
        return ['message'=>'Error al Restablecer','type'=>'error'];
      }
    }
  }
}










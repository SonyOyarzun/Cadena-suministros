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

    $user =  User::where("email", $request->email)->first();

    //Check if the user exists

    if (!$user) {

      return (['email' => trans('User does not exist')]);
    }

    //Create Password Reset Token

    DB::table('password_resets')->insert([
      'email' => $request->email,
      'token' => app('auth.password.broker')->createToken($user),
      'created_at' => Carbon::now()
    ]);

    //Get the token just created above
    $tokenData = DB::table('password_resets')
      ->where('email', $request->email)->first();

    if ($this->sendResetEmail($request->email, $tokenData->token)) {
      return trans('A reset link has been sent to your email address.');
    } else {
      return (['error' => trans('A Network Error occurred. Please try again.')]);
    }
  }

  private function sendResetEmail($email, $token)
  {

    //Retrieve the user from the database
    $user = User::where("email", $email)->first();
    //Generate, the password reset link. The token generated is embedded in the link
    $link = url('/Reset') . '/' . urlencode($user->email) . '/' . urlencode($token);

    try {
      $api = Api_config::findOrFail(1);
      //Here send the link with CURL with an external email API 
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
    $user = User::where("email", $email)->first();

    try {
      $api = Api_config::findOrFail(1);

      $objDemo = new \stdClass();
      $objDemo->receiver  = $user->name;
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
      return "Debe ingresar mail";
    } elseif (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
      return "Formato mail no valido";
    } elseif (!User::where('email', $request->email)->exists()) {
      return "Mail ya existe en los registros";
    } elseif (!isset($request->password)) {
      return "Debe ingresar contraseña";
    } elseif (!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,12}$/', $request->password)) {
      return "Contraseña debe Contener: Mayúsculas, números y mas de 8 carácteres";
    } elseif ($request->password != $request->confirmPassword) {
      return "Contraseñas no coinciden";
    } else {

      $tokenData = DB::table('password_resets')
        ->where('token', $request->token)->first();

      if (!$tokenData) return 'Token no coincide';

      $user = User::where('email', $tokenData->email)->first();

      if (!$user) return 'Email no encontrada';

    //  $user->password = Hash::make($request->password);
      $user->password = bcrypt($request->password);
      $user->update(); //or $user->save();

      //login the user immediately they change password successfully
      Auth::login($user);

      //Delete the token
      DB::table('password_resets')->where('email', $user->email)
        ->delete();

      if ($this->successResetEmail($request->email)) {
        return trans('Email enviado');
      } else {
        return (['error' => trans('Error al enviar')]);
      }
    }
  }
}









//https://github.com/lijujohn13/react-laravel-auth/tree/master/resources/assets/js
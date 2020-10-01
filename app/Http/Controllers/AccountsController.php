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
    $link = url('/Reset').'/'.urlencode($user->email).'/'.urlencode($token);

    try {
      $api = Api_config::findOrFail(1);
      //Here send the link with CURL with an external email API 
      $objDemo = new \stdClass();
      $objDemo->receiver  = $user->name;
      $objDemo->url       = $link;
      $objDemo->logotype  = asset ('storage/images/'.$api->logotype);

      Mail::to($email)->send(new ForgotPassEmail($objDemo));
      return true;
    } catch (\Exception $e) {
      return false;
    }
    
  }

  public function resetPassword(Request $request)
{
  /*
    //Validate input
    $validator = Validator::make($request->all(), [
        'email' => 'required|email|exists:users,email',
        'password' => 'required|confirmed'
        'token' => 'required' ]);

    //check if payload is valid before moving on
    if ($validator->fails()) {
        return redirect()->back()->withErrors(['email' => 'Please complete the form']);
    }

    $password = $request->password;
// Validate the token
    $tokenData = DB::table('password_resets')
    ->where('token', $request->token)->first();
// Redirect the user back to the password reset request form if the token is invalid
    if (!$tokenData) return view('auth.passwords.email');

    $user = User::where('email', $tokenData->email)->first();
// Redirect the user back if the email is invalid
    if (!$user) return redirect()->back()->withErrors(['email' => 'Email not found']);
//Hash and update the new password
    $user->password = Hash::make($password);
    $user->update(); //or $user->save();

    //login the user immediately they change password successfully
    Auth::login($user);

    //Delete the token
    DB::table('password_resets')->where('email', $user->email)
    ->delete();

    //Send Email Reset Success Email
    if ($this->sendSuccessEmail($tokenData->email)) {
        return view('index');
    } else {
        return redirect()->back()->withErrors(['email' => trans('A Network Error occurred. Please try again.')]);
    }
*/
}
}









//https://github.com/lijujohn13/react-laravel-auth/tree/master/resources/assets/js
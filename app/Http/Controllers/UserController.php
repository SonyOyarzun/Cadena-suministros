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
use PhpParser\Node\Stmt\TryCatch;



class UserController extends Controller
{
  public function list(Request $request)
  {
    if (!isset($request->resp)) {
      $user = User::all();
    } else {
      $id = Auth::id();
      $user = User::query()
        ->where('id', '!=', $id)
        ->get();
    }
    return json_encode($user);
  }

  public function my()
  {

    if (Auth::guest()) {

      return json_encode(['role' => '0']);
    } else {

      try {

        $id = Auth::id();
        $user = User::findOrFail($id);
      } catch (\Throwable $th) {

        throw $th;
      }

      return json_encode($user);
    }
  }


  public function search(Request $request)
  {

    try {
      $user = User::findOrFail($request->id);
    } catch (\Throwable $th) {

      return $th->getMessage();
    }
    return json_encode($user);
  }

  public function new(Request $request)
  {

    try {

      if (!isset($request->name)) {
        return ['message' => 'Debe ingresar nombre', 'type' => 'error'];
      } elseif (!isset($request->email)) {
        return ['message' => 'Debe ingresar mail', 'type' => 'error'];
      } elseif (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
        return ['message' => 'Formato mail no valido', 'type' => 'error'];
      } elseif (User::where('email', $request->email)->exists()) {
        return ['message' => 'Mail ya existe en los registros', 'type' => 'error'];
      } elseif (!isset($request->role)) {
        return ['message' => 'Debe ingresar rol', 'type' => 'error'];
      } elseif (!isset($request->path)) {
        return ['message' => 'Debe ingresar ruta de api', 'type' => 'error'];
      } elseif (!isset($request->pass)) {
        return ['message' => 'Debe ingresar contraseña', 'type' => 'error'];
      } elseif (!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,12}$/', $request->pass)) {
        return ['message' => 'Contraseña debe Contener: Mayúsculas, números y mas de 8 carácteres', 'type' => 'error'];
      } elseif ($request->pass != $request->confirmPass) {
        return ['message' => 'Contraseñas no coinciden', 'type' => 'error'];
      } else {


        $user = new User;
        $user->name  = $request->name;
        $user->email = $request->email;
        $user->role  = $request->role;
        $user->path  = $request->path;

        $privateKey = openssl_pkey_new(array(
          'private_key_bits' => 2048,      // Tamaño de la llave
          'private_key_type' => OPENSSL_KEYTYPE_RSA,
        ));

        // Guardar la llave privada en el archivo private.key. No compartir este archivo con nadie
        openssl_pkey_export_to_file($privateKey, 'private.key_' . $request->email);

        // Generar la llave pública para la llave privada
        $public_key = openssl_pkey_get_details($privateKey);

        file_put_contents('public.key', $public_key['key']);

        // Libera la llave privada
        openssl_free_key($privateKey);



        //$user->publicKey   = $request->publicKey;
        //$user->privateKey  = $request->privateKey;
        $user->publicKey   = $public_key;
        $user->privateKey  = $privateKey;
        $user->password  = bcrypt($request->pass);
        $user->created_at = now();
        $user->updated_at = now();
        $user->save();

        return ['message' => 'Usuario Creado', 'type' => 'success'];
      }
    } catch (\Throwable $th) {

      return ['message' => $th->getMessage(), 'type' => 'error'];
    }
  }

  public function edit(Request $request)
  {
    $user = User::findOrFail($request->id);
    if ($user == null) {

      return ['message' => 'Usuario no encontrado', 'type' => 'error'];
    } else {

      if (!isset($request->name)) {
        return ['message' => 'Debe ingresar nombre', 'type' => 'error'];
      } elseif (!isset($request->email)) {
        return ['message' => 'Debe ingresar mail', 'type' => 'error'];
      } elseif (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
        return ['message' => 'Formato mail no valido', 'type' => 'error'];
      } elseif (!isset($request->role)) {
        return ['message' => 'Debe ingresar role', 'type' => 'error'];
      } elseif (!isset($request->path)) {
        return ['message' => 'Debe ingresar ruta de api', 'type' => 'error'];
      } else {

        $user->name  = $request->name;
        $user->email = $request->email;
        $user->role  = $request->role;
        $user->path  = $request->path;
        $user->save();

        return ['message' => 'Usuario Actualizado', 'type' => 'success'];
      }
    }
  }

  public function changePass(Request $request)
  {
    $user = User::findOrFail($request->id);
    if ($user == null) {

      return ['message' => 'Usuario no encontrado', 'type' => 'error'];
    } else {

      if (!isset($request->pass)) {
        return ['message' => 'Debe ingresar contraseña', 'type' => 'error'];
      } elseif (!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,12}$/', $request->pass)) {
        return ['message' => 'Contraseña debe Contener: Mayúsculas, números y mas de 8 carácteres', 'type' => 'error'];
      } elseif ($request->pass != $request->confirmPass) {
        return ['message' => 'Contraseñas no coinciden', 'type' => 'error'];
      } else {
        $user->password  = bcrypt($request->pass);
        $user->save();
        return ['message' => 'Contraseña Actualizada', 'type' => 'success'];
      }
    }
  }

  public function delete(Request $request)
  {
    if ($request->id != 1) {
      $user = User::findOrFail($request->id);
      if ($user == null) {

        return ['message' => 'Usuario no encontrado', 'type' => 'error'];
      } else {
        $user->delete();
        return ['message' => 'Usuario Eliminado', 'type' => 'success'];
        return $request->id;
      }
    } else {
      return ['message' => 'Administrador no puede ser Eliminado', 'type' => 'warning'];
    }
  }


  public function userLogin(Request $request)
  {

    try {

      if (!isset($request->email)) {
        return ['message' => 'Debe ingresar mail', 'type' => 'error'];
      } elseif (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
        return ['message' => 'Formato mail no valido', 'type' => 'error'];
      } elseif (!isset($request->password)) {
        return ['message' => 'Debe ingresar contraseña', 'type' => 'error'];
      } else {

        $user = User::where("email", $request->email)->first();

        if (!is_null($user)) {

          if (Hash::check($request->password, $user->password)) {

            $credentials = $request->only('email', 'password');

            Auth::attempt($credentials);

            return true;
          } else {

            return ['message' => 'Contraseña no coincide', 'type' => 'error'];
          }
        } else {

          return ['message' => 'Mail no registrado', 'type' => 'error'];
        }
      }
    } catch (\Throwable $th) {
      return ['message' => 'Error al Ingresar', 'type' => 'error'];
    }
  }
}









//https://github.com/lijujohn13/react-laravel-auth/tree/master/resources/assets/js
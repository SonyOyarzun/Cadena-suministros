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
    
      /*
        $data = array();

      foreach ($users as $data) {

        if (!$ExtractPublicKey = file_get_contents('key/public.key_' . $data->email . '.key')) {
          die('No se ha podido obtener la llave publica');
        }
        //extrae la llave privada del archivo creado
        if (!$ExtractPrivateKey = file_get_contents('key/private.key_' . $data->email . '.key')) {
          die('No se ha podido obtener la llave privada');
        }

        $user = [
          "email" =>  $data->email,
          "id" =>  $data->id,
          "name" =>  $data->name,
          "path" =>  $data->path,
          "role" =>  $data->role,
          "publicKey" => $ExtractPublicKey,
          "privateKey" => $ExtractPrivateKey,
        ];
      }
*/

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


        if (!$ExtractPublicKey = file_get_contents('key/public.key_' . $user->email . '.key')) {
          die('No se ha podido obtener la llave publica');
        }
        //extrae la llave privada del archivo creado
        if (!$ExtractPrivateKey = file_get_contents('key/private.key_' . $user->email . '.key')) {
          die('No se ha podido obtener la llave privada');
        }

        $user->publicKey = $ExtractPublicKey;
        $user->privateKey = $ExtractPrivateKey;
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

      //extrae la llave publica del archivo creado

      if (!$ExtractPublicKey = file_get_contents('key/public.key_' . $user->email . '.key')) {
        die('No se ha podido obtener la llave publica');
      }
      //extrae la llave privada del archivo creado
      if (!$ExtractPrivateKey = file_get_contents('key/private.key_' . $user->email . '.key')) {
        die('No se ha podido obtener la llave privada');
      }

      $user->publicKey = $ExtractPublicKey;
      $user->privateKey = $ExtractPrivateKey;
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

        // Guardar la llave publica en el archivo public.key. 
        file_put_contents('key/public.key_' . $request->email . '.key', $request->publicKey);
        // Guardar la llave privada en el archivo private.key. 
        file_put_contents('key/private.key_' . $request->email . '.key', $request->privateKey);

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
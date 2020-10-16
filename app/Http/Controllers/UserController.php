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

    if (!isset($request->name)) {
      return "Debe ingresar nombre";
    } elseif (!isset($request->email)) {
      return "Debe ingresar mail";
    } elseif (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
      return "Formato mail no valido";
    } elseif (User::where('email', $request->email)->exists()) {
      return "Mail ya existe en los registros";
    } elseif (!isset($request->role)) {
      return "Debe ingresar role";
    } elseif (!isset($request->path)) {
      return "Debe ingresar ruta de api";
    } elseif (!isset($request->pass)) {
      return "Debe ingresar contraseña";
    } elseif (!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,12}$/', $request->pass)) {
      return "Contraseña debe Contener: Mayúsculas, números y mas de 8 carácteres";
    } elseif ($request->pass != $request->confirmPass) {
      return "Contraseñas no coinciden";
    } else {

      $user = new User;
      $user->name  = $request->name;
      $user->email = $request->email;
      $user->role  = $request->role;
      $user->path  = $request->path;
      $user->publicKey   = $request->publicKey;
      $user->privateKey  = $request->privateKey;
      $user->password  = bcrypt($request->pass);
      $user->created_at = now();
      $user->updated_at = now();
      $user->save();

      return "Usuario Creado";
    }
  }

  public function edit(Request $request)
  {
    $user = User::findOrFail($request->id);
    if ($user == null) {

      return ['message'=>'Usuario no encontrado','type'=>'error'];
    } else {

      if (!isset($request->name)) {
        return ['message'=>'Debe ingresar nombre','type'=>'error'];
      } elseif (!isset($request->email)) {
        return ['message'=>'Debe ingresar mail','type'=>'error'];
      } elseif (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
        return ['message'=>'Formato mail no valido','type'=>'error'];
      } elseif (!isset($request->role)) {
        return ['message'=>'Debe ingresar role','type'=>'error'];
      } elseif (!isset($request->path)) {
        return ['message'=>'Debe ingresar ruta de api','type'=>'error'];
      } else {

        $user->name  = $request->name;
        $user->email = $request->email;
        $user->role  = $request->role;
        $user->path  = $request->path;
        $user->save();

        return ['message'=>'Usuario Actualizado','type'=>'success'];
      }
    }
  }

  public function changePass(Request $request)
  {
    $user = User::findOrFail($request->id);
    if ($user == null) {

      return 'Usuario no encontrado';
    } else {

      if (!isset($request->pass)) {
        return "Debe ingresar contraseña";
      } elseif (!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,12}$/', $request->pass)) {
        return "Contraseña debe Contener: Mayúsculas, números y mas de 8 carácteres";
      } elseif ($request->pass != $request->confirmPass) {
        return "Contraseñas no coinciden";
      } else {
        $user->password  = bcrypt($request->pass);
        $user->save();
        return 'Contraseña Actualizada';
      }
    }
  }

  public function delete(Request $request)
  {
    if ($request->id != 1) {
      $user = User::findOrFail($request->id);
      if ($user == null) {

        return 'Usuario no encontrado';
      } else {
        $user->delete();
        return 'Usuario Eliminado';
        return $request->id;
      }
    } else {
      return 'Administrador no puede ser Eliminado';
    }
  }


  public function userLogin(Request $request)
  {

    try {

      if (!isset($request->email)) {
        return ['message'=>'Debe ingresar mail','type'=>'error'];
      } elseif (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
        return ['message'=>'Formato mail no valido','type'=>'error'];
      } elseif (!isset($request->password)) {
        return ['message'=>'Debe ingresar contraseña','type'=>'error'];
      } else {
  
        $user = User::where("email", $request->email)->first();
  
        if (!is_null($user)) {
  
          if (Hash::check($request->password, $user->password)) {
  
            $credentials = $request->only('email', 'password');
  
            Auth::attempt($credentials);
  
            return true;
  
          } else {
  
            return ['message'=>'Contraseña no coincide','type'=>'error'];
  
          }
  
        } else {
  
          return ['message'=>'Mail no registrado','type'=>'error'];
          
        }
      }
    } catch (\Throwable $th) {
     return ['message'=>'Error al Ingresar','type'=>'error'];
    }
  }
}









//https://github.com/lijujohn13/react-laravel-auth/tree/master/resources/assets/js
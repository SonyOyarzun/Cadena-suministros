<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

use App\User;

class UserController extends Controller
{
    public function index()
    {
       $users=
               DB::table('users')
                ->get();
        
           return json_encode($users);

    }

    public function create(Request $request)
    {
        
            $user = new User;
            $user->name  = $request->name;
            $user->email = $request->email;
            $user->role  = $request->role;
            $user->path  = $request->path;
            $user->password  = bcrypt($request->pass);   
            $user->created_at = now();
            $user->updated_at = now();
            $user->save();
            return "Usuario Creado";
         
    }

    public function update(Request $request)
    {
        
          $user = User::findOrFail($request->id);
          if ($user == null) {

            return 'Usuario no encontrado';
          } else {
            $user->name  = $request->name;
            $user->email = $request->email;
            $user->role  = $request->role;
            $user->path  = $request->path;
            $user->save();
            return 'Usuario Actualizado';
           }
  

    }

    public function changePass(Request $request)
    {
        $user = User::findOrFail($request->id);
          if ($user == null) {

            return 'Usuario no encontrado';
          } else {
            $user->password  = bcrypt($request->pass); 
            $user->save();
            return 'Contraseña Actualizada';
        }

    }

    public function delete(Request $request)
    {
        $user = User::findOrFail($request->id);
        if ($user == null) {

          return 'Usuario no encontrado';
        } else {
          $user->delete();
          return 'Usuario Eliminado';
        }
  
    }


}

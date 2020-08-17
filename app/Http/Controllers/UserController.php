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
            $user->pass  = $request->pass;
        //  $user->save();
          return user;
         

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
            $user->save();
            return 'Usuario Actualizado';
           }
  

    }

    public function changePass(Request $request)
    {
        $product    = $request->id;
        $quantity   = $request->quantity;
        $send       = $request->send;

                DB::table('user')->insert([
                    'id' => $send,
                    'name' => $product,
                    'mail' => $quantity,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]);

    }

    public function delete(Request $request)
    {
        $product = $request->product;
        $send    = $request->send;

  
                 if(isset($request->product)){ 
                 DB::table('lines')->where('id_product', $product)->delete();
                 }
               
                 if(isset($request->send)){ 
                 DB::table('sends')->where('id', $send)->delete();
                 }
            
        
    }


}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
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

    public function insert(Request $request)
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

    public function update(Request $request, $id)
    {
        
        $user = User::find($id);
      //  $user->name = $request->name;
     //   $user->email = $request->emal;
     //   $user->role = $request->role;
    //    $user->save();

        return print $user;

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

<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\Return_;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $product = Product::get();

        return $product;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        try {
            if (!isset($request)) {
                return ['message' => 'Debe ingresar producto', 'type' => 'error'];
            } else {

                $product = new Product;
                $product->json  = json_encode($request[0]);
                $product->timestamps = false;
                $product->save();

                return true;
            }
        } catch (\Throwable $th) {
            return ['message' => $th->getMessage(), 'type' => 'ERROR'];
        }
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(product $product)
    {
        //
    }


    public function exist(Request $request)
    {
        try {
            if (!isset($request)) {

                return false;

            } else {


                $product = Product::where('json', '=', json_encode($request[0]));

                if ($product) {

                    return true;

                }

                return false;
            }
        } catch (\Throwable $th) {

            return false;
            
        }
    }
}

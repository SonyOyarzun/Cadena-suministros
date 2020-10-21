<?php

namespace App\Http\Controllers;

use App\Meter;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

use App\Mail\DemoEmail;
use Illuminate\Support\Facades\Mail;


class MeterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
   
            $array = array();
            $meter = Meter::select()->get();

            foreach($meter as $content){

                $array = array(
                    'key'   => $content->id,
                    'data' => number_format($content->value,2)
                );

                
            };

        } catch (\Throwable $th) {

            return $th->getMessage();
        }
        return $array;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        try {
            
            $meter = new Meter;
            $meter->value = $request->value;
            $meter->max = $request->max;
            $meter->min = $request->min;
            $meter->created_at = now();
            $meter->updated_at = now();
            $meter->save();
            
        } catch (\Throwable $th) {

            return $th->getMessage();
        }

        return "Temperatura guardada";
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
     * @param  \App\Meter  $meter
     * @return \Illuminate\Http\Response
     */
    public function show(Meter $meter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Meter  $meter
     * @return \Illuminate\Http\Response
     */
    public function edit(Meter $meter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Meter  $meter
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Meter $meter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Meter  $meter
     * @return \Illuminate\Http\Response
     */
    public function destroy(Meter $meter)
    {
        //
    }
}

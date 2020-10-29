<?php

namespace App\Http\Controllers;

use App\Meter;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;


use App\Mail\DemoEmail;
use Illuminate\Support\Facades\Mail;

use App\Events\MeterEvent;


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

            $id = Auth::id();
            $array = array();
            $meter = Meter::select()->limit(10)->orderBy('chain', 'desc')->where('userId', '=', $id)->get();

            array_push($array, ['T', 'C°', 'Min', 'Max']);

            if ($meter->count() > 0) {
               
                foreach ($meter as $content) {

                    /*
                    $meter = array(
    
                        'key'   => "$content->id",
                        'data'  => number_format($content->value,2)
                        
                    );
    */
                    array_push($array, ["$content->chain", (float)number_format($content->value, 2), $content->min, $content->max]);
                };
            } else {
                array_push($array, [0, (float)number_format(0, 2), 0, 10]);
            }
        } catch (\Throwable $th) {

            return false;
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

            $id = Auth::id();

            $meter = new Meter;
            $meter->value = $request->value;
            $meter->max = $request->max;
            $meter->min = $request->min;
            $meter->chain = $request->chain;
            $meter->userId = $id;
            $meter->created_at = now();
            $meter->updated_at = now();
            $meter->save();

            $user = Auth::user();
            $index = [$this->index()];

            broadcast(new MeterEvent($index, $user));
            
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

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
            $meter = Meter::select()->orderBy('id', 'asc')->where('userId', '=', $id)->get();

            array_push($array,['fecha',['T', 'C°', 'Min', 'Max']]);

            if (count($meter) > 0) {

                foreach ($meter as $content) {

                    /*
                    $meter = array(
    
                        'key'   => "$content->id",
                        'data'  => number_format($content->value,2)
                        
                    );
                    date('d/m/y d:m:s', strtotime($content->updated_at))
    */
                    array_push($array, [date('d/m/y d:m:s', strtotime($content->updated_at)),[$content->chain, (float)number_format($content->value, 2), $content->min, $content->max]]);
                };
            } else {
                array_push($array, ['---',[0, (float)number_format(0, 2), 0, 10]]);
            }
        } catch (\Throwable $th) {

            return  ['message' => $th->getMessage(), 'type' => 'error'];
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

            $user = Auth::user();

            $meter = new Meter;

            if (!isset($request->value)) {
                return ['message' => 'Registro sin valor', 'type' => 'error'];
            } elseif (!isset($request->max)) {
                return ['message' => 'Registro sin maximo', 'type' => 'error'];
            } elseif (!isset($request->min)) {
                return ['message' => 'Registro sin minimo', 'type' => 'error'];
            } elseif (!isset($request->chain)) {
                return ['message' => 'cadena sin valor', 'type' => 'error'];
            } else {

                $meter->value = $request->value;
                $meter->max = $request->max;
                $meter->min = $request->min;
                $meter->chain = $request->chain;
                $meter->userId = $user->id;
                $meter->created_at = now();
                $meter->updated_at = now();
                $meter->save();

                $index = [$this->index()];

                broadcast(new MeterEvent($index, $user));

                return  ['message' => 'Temperatura guardada', 'type' => 'success'];
            }
        } catch (\Throwable $th) {

            return $th->getMessage();
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
     * @param  \App\Meter  $meter
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $meter = Meter::select()->orderBy('id', 'asc')->where('chain', '=', $request->chain)->get();

        return  $meter;
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
    public function destroy()
    {
        $userId = Auth::id();
        $meter =Meter::where('Userid',$userId)->delete();
    }
}

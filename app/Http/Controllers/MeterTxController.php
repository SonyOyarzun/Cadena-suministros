<?php

namespace App\Http\Controllers;

use App\MeterTx;
use Illuminate\Http\Request;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

class MeterTxController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $meter = MeterTx::select()->orderBy('id', 'desc')->where('user', '=', $request->id)->limit(1)->get();

          
        } catch (\Throwable $th) {

            return  ['message' => $th->getMessage(), 'type' => 'error'];
        }
        return $meter;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        try {

            $user = Auth::id();

            $meter = new MeterTx;

            if (!isset($request->tx)) {
                return ['message' => 'Tx sin valor', 'type' => 'error'];
            } else {

                $meter->user = $user;
                $meter->tx   = $request->tx;
                $meter->created_at = now();
                $meter->updated_at = now();
                $meter->save();

                return  ['message' => 'Tx guardada', 'type' => 'success'];
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
     * @param  \App\meterTx  $meterTx
     * @return \Illuminate\Http\Response
     */
    public function show(meterTx $meterTx)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\meterTx  $meterTx
     * @return \Illuminate\Http\Response
     */
    public function edit(meterTx $meterTx)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\meterTx  $meterTx
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, meterTx $meterTx)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\meterTx  $meterTx
     * @return \Illuminate\Http\Response
     */
    public function destroy(meterTx $meterTx)
    {
        //
    }
}

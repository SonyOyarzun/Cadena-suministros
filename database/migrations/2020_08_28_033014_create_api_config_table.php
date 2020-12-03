<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApiConfigTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api_config', function (Blueprint $table) {
            $table->id();
            
             //API
            $table->string('path');
            $table->string('transaction');
            $table->string('asset');
            $table->string('api_port');
            $table->string('db_port');

            //CORREO
            $table->string('mailer');
            $table->string('host');
            $table->string('port');
            $table->string('user');
            $table->string('pass');
            $table->string('encryption');
            $table->string('from');
            $table->string('fromName');

             //FIREBASE
            $table->string('apiKey');
            $table->string('authDomain');
            $table->string('databaseURL');
            $table->string('projectId');
            $table->string('storageBucket');
            $table->string('messagingSenderId');
            $table->string('appId');
            $table->string('measurementId');
            $table->string('serverKey');

             //APP
            $table->string('logotype');
            $table->string('background');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('api_config');
    }
}


<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ApiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('api_config')->insert([
            
            'id'            => 1,

            //API
            'path'          => 'https://test.ipdb.io/api/v1/',
            'transaction'   => 'transactions/',
            'asset'         => 'assets/',
            'api_port'      => '9984',
            'db_port'       => '27001',

            //CORREO
            'mailer'        => 'smtp',
            'host'          => 'smtp.mailtrap.io',
            'port'          => '2525',
            'user'          => 'eb9a7318d73a41',
            'pass'          => '260c45cd1cc606',
            'encryption'    => 'tls',
            'from'          => 'null',
            'fromName'      => 'Cadena de Suministros',

            //FIREBASE
            'apiKey'        => 'AIzaSyBk9Y7_TsbZiA0lciQ1vvwSo3ez8jtYtso',
            'authDomain'    => 'cadenasuministros.firebaseapp.com/',
            'databaseURL'   => 'https://cadenasuministros.firebaseio.com',
            'projectId'     => 'cadenasuministros',
            'storageBucket' => 'cadenasuministros.appspot.com',
            'messagingSenderId' => '967812490146',
            'appId'         => '1:967812490146:web:ab6fd137d2a80de9d548fb',
            'measurementId'   => 'G-T7Q6EB91JH',

            //APP
            'logotype'      => 'logo.png',
            'background'    => 'background.jpg',

            'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at'    => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}

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
            'path'          => 'https://test.ipdb.io/api/v1/',
            'transaction'   => 'transactions/',
            'port'          => '9984',
            'logotype'      => 'https://ciisa.cl/wp-content/uploads/2017/03/LOGO_CIISA_apaisado_PNG.png',
            'background'    => 'http://www.lowgif.com/56480815b42abfa6.html',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

    }
}


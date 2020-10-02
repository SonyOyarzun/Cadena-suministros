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
            'path'          => 'https://test.ipdb.io/api/v1/',
            'transaction'   => 'transactions/',
            'asset'         => 'assets/',
            'api_port'      => '9984',
            'db_port'       => '27001',
            'logotype'      => 'logo.png',
            'background'    => 'background.jpg',
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at'    => Carbon::now()->format('Y-m-d H:i:s')
        ]);

    }
}


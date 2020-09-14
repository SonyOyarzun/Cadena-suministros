<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'path' => 'https://feriados-cl-api.herokuapp.com/feriados',
            'role' => 'P',
            'password' => bcrypt('12345678'),
            'publicKey'  => '5bAAdgeKRpaiQ75onTGaBjkGM6HZ9GiCD2Xhv3pA9Ksq',
            'privateKey' => '9YKU2mvEUe6DMYiCguef6knTwdCvjmykXXHB1VznYLAH',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        DB::table('users')->insert([
            'name' => 'Salcobrand',
            'email' => 'prueba@ciisa.cl',
            'path' => 'https://feriados-cl-api.herokuapp.com/feriados',
            'role' => 'P',
            'password' => bcrypt('12345678'),
            'publicKey'  => 'H66ANcwb4W81iRHsMReHwJWnPcwyGZCAcWBQDbn6YuqL',
            'privateKey' => '2RjzmEEXWf51vmhdywNW4aqKjhSyHorYBP4Y2hX3sq4r',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

    }
}

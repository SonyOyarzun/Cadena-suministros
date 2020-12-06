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
            'name' => 'Laboratorios de Niche',
            'email' => 'admin@admin.com',
            'path' => 'https://raw.githubusercontent.com/SonyOyarzun/Json-Server/main/medical.json',
            'role' => 'A',
            'password' => bcrypt('12345678'),
            'publicKey'  => '5bAAdgeKRpaiQ75onTGaBjkGM6HZ9GiCD2Xhv3pA9Ksq',
            'privateKey' => '9YKU2mvEUe6DMYiCguef6knTwdCvjmykXXHB1VznYLAH',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        DB::table('users')->insert([
            'name' => 'CC Chile',
            'email' => 'ccchile@cadena.cl',
            'path' => 'https://raw.githubusercontent.com/SonyOyarzun/Json-Server/main/medical.json',
            'role' => 'U',
            'password' => bcrypt('12345678'),
            'publicKey'  => 'H66ANcwb4W81iRHsMReHwJWnPcwyGZCAcWBQDbn6YuqL',
            'privateKey' => '2RjzmEEXWf51vmhdywNW4aqKjhSyHorYBP4Y2hX3sq4r',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        DB::table('users')->insert([
            'name' => 'AC SUR',
            'email' => 'acsur@cadena.cl',
            'path' => 'https://raw.githubusercontent.com/SonyOyarzun/Json-Server/main/medical.json',
            'role' => 'U',
            'password' => bcrypt('12345678'),
            'publicKey'  => 'H3EaF1k3dntV7q6dHFayAFHCuiVZa8wSrHAztUUaBYaM',
            'privateKey' => '9oaPQiy39SQZkNKwsYuA2V5XgUkpKPnr6oCiQ1PHxFzj',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        DB::table('users')->insert([
            'name' => 'Consultorio',
            'email' => 'consultorio@cadena.cl',
            'path' => 'https://raw.githubusercontent.com/SonyOyarzun/Json-Server/main/medical.json',
            'role' => 'U',
            'password' => bcrypt('12345678'),
            'publicKey'  => '3fEZQX2yasZTDp7R7a8eUuNaNB3W2xzqvVwT4yYHUqrd',
            'privateKey' => 'FeinCmwNP764MPnnYtHVdof8QZqWFDtjcLpWgnXrH2jE',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

    }
}

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

    $route = 'public/key/public.key_';

       DB::table('users')->insert([
            'name' => 'Laboratorios de Niche',
            'email' => 'admin@admin.com',
            'path' => 'https://raw.githubusercontent.com/SonyOyarzun/Json-Server/main/medical.json',
            'role' => 'A',
            'password' => bcrypt('12345678'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        file_put_contents($route . 'admin@admin.com','5bAAdgeKRpaiQ75onTGaBjkGM6HZ9GiCD2Xhv3pA9Ksq');
        file_put_contents($route . 'admin@admin.com','9YKU2mvEUe6DMYiCguef6knTwdCvjmykXXHB1VznYLAH');

        DB::table('users')->insert([
            'name' => 'CC Chile',
            'email' => 'ccchile@cadena.cl',
            'path' => 'https://raw.githubusercontent.com/SonyOyarzun/Json-Server/main/medical.json',
            'role' => 'U',
            'password' => bcrypt('12345678'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        file_put_contents($route. 'ccchile@cadena.cl','H66ANcwb4W81iRHsMReHwJWnPcwyGZCAcWBQDbn6YuqL');
        file_put_contents($route. 'ccchile@cadena.cl','2RjzmEEXWf51vmhdywNW4aqKjhSyHorYBP4Y2hX3sq4r');

        DB::table('users')->insert([
            'name' => 'AC SUR',
            'email' => 'acsur@cadena.cl',
            'path' => 'https://raw.githubusercontent.com/SonyOyarzun/Json-Server/main/medical.json',
            'role' => 'U',
            'password' => bcrypt('12345678'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        file_put_contents($route. 'acsur@cadena.cl','H3EaF1k3dntV7q6dHFayAFHCuiVZa8wSrHAztUUaBYaM');
        file_put_contents($route . 'acsur@cadena.cl','9oaPQiy39SQZkNKwsYuA2V5XgUkpKPnr6oCiQ1PHxFzj');

        DB::table('users')->insert([
            'name' => 'Consultorio',
            'email' => 'consultorio@cadena.cl',
            'path' => 'https://raw.githubusercontent.com/SonyOyarzun/Json-Server/main/medical.json',
            'role' => 'U',
            'password' => bcrypt('12345678'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        file_put_contents($route. 'consultorio@cadena.cl','3fEZQX2yasZTDp7R7a8eUuNaNB3W2xzqvVwT4yYHUqrd');
        file_put_contents($route. 'consultorio@cadena.cl','FeinCmwNP764MPnnYtHVdof8QZqWFDtjcLpWgnXrH2jE');

        DB::table('users')->insert([
            'name' => 'Dogges Chile',
            'email' => 'central@dogges.cl',
            'path' => 'https://raw.githubusercontent.com/SonyOyarzun/Json-Server/main/dogges.json',
            'role' => 'A',
            'password' => bcrypt('12345678'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        file_put_contents($route. 'central@dogges.cl','7Bj9SfW3hX6i82Lfzhwq5ywCn9WJBP3AYgNpSFSYgo7J');
        file_put_contents($route. 'central@dogges.cl','E4VdFFQjTQCbweSSH1iBRSihHx5S6RC7JhXfcuBvFQdZ');

        DB::table('users')->insert([
            'name' => 'Dogges Brazil',
            'email' => 'central@dogges.br',
            'path' => 'https://raw.githubusercontent.com/SonyOyarzun/Json-Server/main/dogges.json',
            'role' => 'A',
            'password' => bcrypt('12345678'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        file_put_contents($route . 'central@dogges.br','De5GL8AVfdAMNCnUvx1UZhNwJkbj1h2mkScQAYyhti4U');
        file_put_contents($route . 'central@dogges.br','Ds1aoqNjmuqntvCuMDCiS9cBWH4Mdj7TTu69HqnobKRo');

    }
}

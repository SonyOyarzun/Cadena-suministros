<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(UserSeeder::class);
         $this->call(ApiSeeder::class);
         $this->call(MeterSeeder::class);
      
    }
}

//php artisan migrate:refresh --seed
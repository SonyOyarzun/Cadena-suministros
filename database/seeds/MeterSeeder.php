<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class MeterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('meters')->insert([
            'id'            => 1,
            'value'         => 5.0,
            'min'           => 0,
            'max'           => 10,
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at'    => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}

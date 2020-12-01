<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\DB;

class SmtpProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {

        if (\Schema::hasTable('api_config')) {
                 
            $api = DB::table('api_config')->first();
            
            if ($api) //checking if table is not empty
            {
                $config = array(
                    'mailer'        => $api->mailer,
                    'host'          => $api->host,
                    'port'          => $api->port,
                    'user'          => $api->user,
                    'pass'          => $api->pass,
                    'encryption'    => $api->encryption,
                    'from'          => $api->from,
                    'fromName'      => $api->fromName,
                );
                config()->set('smtp', $config);
                dd(config());
            }
            
        }

        
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}

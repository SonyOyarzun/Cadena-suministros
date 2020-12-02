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

      

        
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        if (\Schema::hasTable('api_config')) {
                 
            $api = DB::table('api_config')->first();
            
            if ($api) //checking if table is not empty
            {
                $config = array(
                    'driver'     => $api->mailer,
                    'host'       => $api->host,
                    'port'       => $api->port,
                    'from'       => array('address' => $api->from, 'name' => $api->fromName ),
                    'encryption' => $api->encryption,
                    'username'   => $api->user,
                    'password'   => $api->pass,
                    'sendmail'   => '/usr/sbin/sendmail -bs',
                    'pretend'    => false,
                );
                config()->set('mail', $config);
    
            }
            
        }
    }
}

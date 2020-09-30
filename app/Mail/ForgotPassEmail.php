<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgotPassEmail extends Mailable
{
    use Queueable, SerializesModels;
     
    /**
     * The demo object instance.
     *
     * @var Demo
     */
    public $demo;
 
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($demo)
    {
        $this->demo = $demo;
    }
 
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('sender@example.com')
                    ->view('forgot.blade')
                    ->text('forgot_plain.blade')
                    ->with(
                      [
                            'message_1' => 'Se ha solicitado un restablecimiento de contraseña,',
                            'message_2' => 'Si usted no lo ha realizado, ignore este mensaje.',
                            'message_3' => 'Puede ir al enlace mdiante el siguiente boton :'
                      ]);
                      
    }
}

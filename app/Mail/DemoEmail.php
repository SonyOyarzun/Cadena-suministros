<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DemoEmail extends Mailable
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
        return $this->view('mails.demo')
                    ->text('mails.demo_plain')
                    ->with(
                      [
                            'message_1' => 'El estado del envio realizado se encuentra :',
                            'message_2' => 'Perteneciente a la ID :',
                            'message_3' => 'Por el usuario :',
                            'message_4' => 'Durante la fecha :',
                            'message_5' => 'Puede consultar mas detalles en el enlace mas abajo',
                      ]);
                      /*
                      ->attach(public_path('/images').'/demo.jpg', [
                              'as' => 'demo.jpg',
                              'mime' => 'image/jpeg',
                      ]);
                      */
    }
}

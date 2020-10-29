<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use PhpParser\Node\Expr\Cast\Object_;
use App\User;
use Illuminate\Support\Facades\Auth;

class MeterEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $meter;
    public $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Array $meter,User $user)
    {
        $this->meter = $meter;
        $this->user = $user;  
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('meter.'.Auth::id(),$this->user);
    }
}
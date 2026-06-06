<?php

namespace App\Models\Client;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

   protected $fillable = [
    'date',
    'heure',
    'duration',
    'statut',
    'estEngage',
    'client_id',
    'service_id',
];

    protected $casts = [
        'date' => 'date',
        'time' => 'datetime:H:i',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function service()
    {
        return $this->belongsTo(\App\Models\Provider\Service::class);
    }
}

<?php

namespace App\Models\Provider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\Client\Reservation;

class Service extends Model
{
    use HasFactory;

   protected $fillable = [
    'name',
    'prix',
    'duration',
    'provider_id',
];
    protected $casts = [
        'prix' => 'decimal:2',
    ];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}

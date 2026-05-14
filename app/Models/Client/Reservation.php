<?php

namespace App\Models\Client;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Illuminate\Support\Carbon $date
 * @property string $heure
 * @property int|null $duration
 * @property string $statut
 * @property int $estEngage
 * @property int $client_id
 * @property int $service_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Client\Client $client
 * @property-read \App\Models\Provider\Service $service
 * @method static \Database\Factories\Client\ReservationFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation whereEstEngage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation whereHeure($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation whereStatut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reservation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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

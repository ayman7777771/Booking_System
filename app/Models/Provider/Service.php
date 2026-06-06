<?php

namespace App\Models\Provider;

use App\Models\Client\Reservation;
use App\Models\Client\Review;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}

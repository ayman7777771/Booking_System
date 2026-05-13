<?php

namespace App\Models\Client;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

   protected $fillable = [
    'note',
    'commentaire',
    'client_id',
    'service_id',
];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function provider()
    {
        return $this->belongsTo(\App\Models\Provider\Provider::class);
    }
    public function service() {
    return $this->belongsTo(\App\Models\Provider\Service::class);
}
}

<?php

namespace App\Models\Provider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exception extends Model
{
    use HasFactory;

    protected $table = 'exceptions';

  protected $fillable = [
    'date',
    'estDisponible',
    'heureDebut',
    'heureFin',
    'provider_id',
];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}

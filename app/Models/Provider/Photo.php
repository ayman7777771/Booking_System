<?php

namespace App\Models\Provider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

 protected $fillable = [
    'path',
    'service_id',
];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}

<?php

namespace App\Models\Provider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planning extends Model
{
    use HasFactory;

  protected $fillable = [
        'provider_id',
        'day',
        'time',
    ];
    protected $casts = [
    'time' => 'array',
  ];
    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}

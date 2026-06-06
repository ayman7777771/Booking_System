<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Provider\Provider;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function providers()
    {
        return $this->hasMany(Provider::class, 'categorie_id');
    }
}

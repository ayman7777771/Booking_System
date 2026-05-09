<?php

namespace App\Models\Provider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\Categorie;

use App\Models\Provider\Service;
use App\Models\Provider\Planning;
use App\Models\Provider\Exception;
use App\Models\Provider\Photo;

use App\Models\Client\Review;

class Provider extends Model
{
    use HasFactory;

   protected $fillable = [
    'user_id',
    'categorie_id',
    'description',
    'mainphoto',
    'longitude',
    'latitude',
    'service',
];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function plannings()
    {
        return $this->hasMany(Planning::class);
    }

    public function exceptions()
    {
        return $this->hasMany(Exception::class);
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
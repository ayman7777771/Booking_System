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

/**
 * @property int $id
 * @property int $user_id
 * @property int $categorie_id
 * @property string|null $description
 * @property string|null $main_photo
 * @property numeric|null $longitude
 * @property numeric|null $latitude
 * @property string $service
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Categorie $categorie
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Exception> $exceptions
 * @property-read int|null $exceptions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Photo> $photos
 * @property-read int|null $photos_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Planning> $plannings
 * @property-read int|null $plannings_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Review> $reviews
 * @property-read int|null $reviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Service> $services
 * @property-read int|null $services_count
 * @property-read User $user
 * @method static \Database\Factories\Provider\ProviderFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereCategorieId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereMainPhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereService($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereUserId($value)
 * @mixin \Eloquent
 */
class Provider extends Model
{
    use HasFactory;

   protected $fillable = [
    'user_id',
    'categorie_id',
    'description',
    'main_photo',
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
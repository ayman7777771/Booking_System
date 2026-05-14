<?php

namespace App\Models\Provider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $date
 * @property int $estDisponible
 * @property string|null $heureDebut
 * @property string|null $heureFin
 * @property int $provider_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Provider\Provider $provider
 * @method static \Database\Factories\Provider\ExceptionFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exception newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exception newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exception query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exception whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exception whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exception whereEstDisponible($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exception whereHeureDebut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exception whereHeureFin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exception whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exception whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exception whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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

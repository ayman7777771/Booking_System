<?php

namespace App\Models\Provider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $provider_id
 * @property string $day
 * @property array<array-key, mixed> $time
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Provider\Provider $provider
 * @method static \Database\Factories\Provider\PlanningFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Planning newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Planning newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Planning query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Planning whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Planning whereDay($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Planning whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Planning whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Planning whereTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Planning whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ville newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ville newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ville query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ville whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ville whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ville whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ville whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Ville extends Model
{
    protected $fillable = [
        'name',
    ];
    public function users()
    {
        return $this->hasMany(User::class);
    }
}

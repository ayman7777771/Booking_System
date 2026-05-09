<?php

namespace Database\Factories\Provider;

use App\Models\Provider\Photo;
use App\Models\Provider\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class PhotoFactory extends Factory
{
    protected $model = Photo::class;

    public function definition(): array
    {
        return [
            'service_id' => Service::inRandomOrder()->first()?->id,

            'path' => fake()->imageUrl()
        ];
    }
}
<?php

namespace Database\Factories\Provider;

use App\Models\Categorie;
use App\Models\Provider\Provider;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProviderFactory extends Factory
{
    protected $model = Provider::class;

    public function definition(): array
    {
      return [
            'categorie_id' => \App\Models\Categorie::inRandomOrder()->first()?->id,
            'description' => fake()->paragraph(),
            'Mainphoto' => fake()->imageUrl(),
            'longitude' => fake()->longitude(),
            'latitude' => fake()->latitude(),
            'service' => fake()->jobTitle(),
        ];
    }
}
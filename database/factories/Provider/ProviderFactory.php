<?php

namespace Database\Factories\Provider;

use App\Models\Categorie;
use App\Models\Provider\Provider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

class ProviderFactory extends Factory
{
    protected $model = Provider::class;

    public function definition(): array
    {
        $storedProviderImages = Storage::disk('public')->files('providers');

        return [
            'categorie_id' => Categorie::inRandomOrder()->first()?->id,
            'description' => fake()->paragraph(),
            'main_photo' => fake()->randomElement($storedProviderImages ?: [null]),
            'longitude' => fake()->longitude(),
            'latitude' => fake()->latitude(),
            'service' => fake()->jobTitle(),
        ];
    }
}

<?php

namespace Database\Factories\Provider;

use App\Models\Categorie;
use App\Models\Provider\Provider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProviderFactory extends Factory
{
    protected $model = Provider::class;

    public function definition(): array
    {
        $storedProviderImages = Storage::disk('public')->files('providers');

        return [
            'categorie_id' => Categorie::inRandomOrder()->first()?->id,
            'description' => fake()->paragraph(),
            'main_photo' => $storedProviderImages
                ? fake()->randomElement($storedProviderImages)
                : 'https://picsum.photos/seed/provider-'.Str::uuid().'/900/520',
            'longitude' => fake()->longitude(),
            'latitude' => fake()->latitude(),
            'service' => fake()->jobTitle(),
        ];
    }
}

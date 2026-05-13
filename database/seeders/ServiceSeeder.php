<?php

namespace Database\Seeders;

use App\Models\Provider\Service;
use App\Models\Provider\Provider;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $providers = Provider::all();

        foreach ($providers as $provider) {
            Service::create([
                'provider_id' => $provider->id,
                'name' => fake()->word(),
                'prix' => fake()->numberBetween(50, 500),
                'duration' => fake()->numberBetween(30, 120),
            ]);
        }
    }
}
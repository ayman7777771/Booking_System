<?php

namespace Database\Seeders;

use App\Models\Provider\Provider;
use App\Models\Provider\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        Provider::query()->each(function (Provider $provider): void {
            Service::factory()->create([
                'provider_id' => $provider->id,
            ]);
        });
    }
}

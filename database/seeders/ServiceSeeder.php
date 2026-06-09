<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Provider\Service;
use App\Models\Provider\Provider;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $providers = Provider::all();

        foreach ($providers as $provider) {
            $services = [
                [
                    'name'        => 'Coiffeur de Fès',
                    'prix'        => 100.00,
                    'duration'    => 45,
                    'provider_id' => $provider->id,
                ],
                [
                    'name'        => 'Services de Nettoyage',
                    'prix'        => 250.00,
                    'duration'    => 120,
                    'provider_id' => $provider->id,
                ],
                [
                    'name'        => 'Massage Relaxant',
                    'prix'        => 300.00,
                    'duration'    => 60,
                    'provider_id' => $provider->id,
                ],
            ];

            foreach ($services as $service) {
                Service::create($service);
            }
        }

        Provider::query()->each(function (Provider $provider): void {
            Service::factory()->create([
                'provider_id' => $provider->id,
            ]);
        });
    }
}

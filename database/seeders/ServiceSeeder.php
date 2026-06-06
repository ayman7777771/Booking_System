<?php

namespace Database\Seeders;

<<<<<<< HEAD
use Illuminate\Database\Seeder;
use App\Models\Provider\Service;
use App\Models\Provider\Provider;
=======
use App\Models\Provider\Provider;
use App\Models\Provider\Service;
use Illuminate\Database\Seeder;
>>>>>>> c751ca930e8ae6edbd4190fab39e797edabd05dc

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
<<<<<<< HEAD
        // Kan-jibou ga3 l-providers li 3ndna f l-base de données
        $providers = Provider::all();

        // Ila lqina les providers, n-bdaw n-zidu lihom khidamat
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
=======
        Provider::query()->each(function (Provider $provider): void {
            Service::factory()->create([
                'provider_id' => $provider->id,
            ]);
        });
>>>>>>> c751ca930e8ae6edbd4190fab39e797edabd05dc
    }
}

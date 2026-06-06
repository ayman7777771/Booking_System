<?php

namespace Database\Factories\Provider;

use App\Models\Provider\Provider;
use App\Models\Provider\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    protected $model = Service::class;

    public function definition(): array
    {
        $serviceNames = [
            'Installation de plomberie',
            'Réparation de robinets',
            'Nettoyage des canalisations',
            'Installation électrique',
            'Maintenance des câbles',
            'Remplacement des interrupteurs',
            'Installation de portes',
            'Peinture des murs',
            'Réparation des sols',
            'Nettoyage complet',
        ];

        return [
            'provider_id' => Provider::inRandomOrder()->first()?->id,

            'name' => $this->faker->randomElement($serviceNames),

            'prix' => $this->faker->numberBetween(100, 1000),

            'duration' => $this->faker->numberBetween(30, 480),
        ];
    }
}

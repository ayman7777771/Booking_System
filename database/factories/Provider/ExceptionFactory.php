<?php

namespace Database\Factories\Provider;

use App\Models\Provider\Exception as ProviderException;
use App\Models\Provider\Provider;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExceptionFactory extends Factory
{
    protected $model = ProviderException::class;

    public function definition(): array
    {
        return [
           'provider_id' => Provider::inRandomOrder()->first()?->id,

            'date' => $this->faker->date(),

            'estDisponible' => $this->faker->boolean(),

            'heureDebut' => $this->faker->time(),

            'heureFin' => $this->faker->time(),
        ];
    }
}
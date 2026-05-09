<?php

namespace Database\Factories\Client;

use App\Models\Client\Client;
use App\Models\Client\Reservation;
use App\Models\Provider\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservationFactory extends Factory
{
    protected $model = Reservation::class;

    public function definition(): array
    {
        $statuses = ['en_attente', 'confirmee', 'terminee', 'annulee'];

        return [
            'client_id' => Client::inRandomOrder()->first()?->id
                ?? Client::factory()->create()->id,

            'service_id' => Service::inRandomOrder()->first()?->id
                ?? Service::factory()->create()->id,

            'date' => $this->faker->dateTimeBetween('now', '+30 days'),

            'heure' => $this->faker->time('H:i'),

            'statut' => $this->faker->randomElement($statuses),

            'estEngage' => $this->faker->boolean(),
        ];
    }
}
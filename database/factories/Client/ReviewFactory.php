<?php

namespace Database\Factories\Client;

use App\Models\Client\Client;
use App\Models\Client\Review;
use App\Models\Provider\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

public function definition(): array
{
    $comments = [
        'Service excellent',
        'Très professionnel',
        'Rapide et efficace',
        'Très bon travail',
        'Je recommande fortement',
        'Qualité au top',
        'Très satisfait',
        'Travail propre et sérieux',
        'Bonne expérience',
        'Service fiable',
    ];

    return [
        'client_id' => Client::inRandomOrder()->first()?->id,
        'service_id' => Service::inRandomOrder()->first()?->id,

        'note' => $this->faker->numberBetween(1, 5),

        'commentaire' => $this->faker->randomElement($comments),
    ];
}
}
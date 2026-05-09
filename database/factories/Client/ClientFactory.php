<?php

namespace Database\Factories\Client;

use App\Models\Client\Client;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    protected $model = Client::class;

    public function definition(): array
    {
        return [
            'avertissement' => $this->faker->optional()->sentence(),
        ];
    }
}
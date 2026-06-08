<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Ville;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $storedProfileImages = Storage::disk('public')->files('profiles');

        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'tel' => fake()->phoneNumber(),
            'password' => Hash::make('password'),
            'ville_id' => Ville::inRandomOrder()->first()?->id,
            'photoProfile' => count($storedProfileImages) > 2
                ? fake()->randomElement($storedProfileImages)
                : 'https://i.pravatar.cc/240?u='.Str::uuid(),
            'role' => fake()->randomElement(['client', 'provider']),
            'statut' => true,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

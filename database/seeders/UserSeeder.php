<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Client\Client;
use App\Models\Provider\Provider;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('11111111'),
                'role' => 'admin',
                'statut' => true,
            ]
        );

        User::factory(20)->create()->each(function ($user) {

            if ($user->role === 'client') {
                Client::factory()->create([
                    'user_id' => $user->id,
                ]);
            }

            if ($user->role === 'provider') {
                $category = Categorie::inRandomOrder()->first();

                Provider::factory()->create([
                    'user_id' => $user->id,
                    'categorie_id' => $category?->id,
                ]);
            }
        });
    }
}

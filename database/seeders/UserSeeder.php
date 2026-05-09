<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
       User::factory(20)->create()->each(function ($user) {
        if ($user->role === 'client') {
            \App\Models\Client\Client::factory()->create([
                'user_id' => $user?->id,
            ]);
        }

        if ($user->role === 'provider') {

            $category = \App\Models\Categorie::inRandomOrder()->first();

            \App\Models\Provider\Provider::factory()->create([
                'user_id' => $user?->id,
                'categorie_id' => $category?->id,
            ]);
        }
    });
    }
}
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategorieSeeder::class,
            UserSeeder::class,
            // Provider
            \Database\Seeders\Provider\ServiceSeeder::class,
            \Database\Seeders\Provider\PhotoSeeder::class,
            // \Database\Seeders\Provider\PlanningSeeder::class,
            \Database\Seeders\Provider\ExceptionSeeder::class,
            // Client
            \Database\Seeders\Client\ReservationSeeder::class,
            \Database\Seeders\Client\ReviewSeeder::class,

         

        ]);
    }
}
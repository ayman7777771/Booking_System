<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            // 1. Data l-asasiya (Base Data)
            VilleSeeder::class,  
            CategorieSeeder::class,

            // 2. L-users (Providers & Clients)
            UserSeeder::class,

            // 3. L-khidamat (Services)
            // Khdem b had l-path ila kān kine f Provider folder nichan
            \Database\Seeders\Provider\ServiceSeeder::class,
            \Database\Seeders\Provider\PhotoSeeder::class,
            \Database\Seeders\Provider\ExceptionSeeder::class,

            // 4. L-khidma dyal l-client (Interactions)
            \Database\Seeders\Client\ReservationSeeder::class,
            \Database\Seeders\Client\ReviewSeeder::class,
        ]);
    }
}
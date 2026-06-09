<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            VilleSeeder::class,  
            CategorieSeeder::class,

            UserSeeder::class,

            \Database\Seeders\Provider\ServiceSeeder::class,
            \Database\Seeders\Provider\PhotoSeeder::class,
            \Database\Seeders\Provider\ExceptionSeeder::class,

            \Database\Seeders\Client\ReservationSeeder::class,
            \Database\Seeders\Client\ReviewSeeder::class,
        ]);
    }
}
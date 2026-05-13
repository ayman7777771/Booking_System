<?php

namespace Database\Seeders;

use Database\Seeders\Client\ReservationSeeder;
use Database\Seeders\Client\ReviewSeeder;
use Database\Seeders\Provider\ExceptionSeeder;
use Database\Seeders\Provider\PhotoSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
    VilleSeeder::class,  
    CategorieSeeder::class,
    UserSeeder::class,

    ServiceSeeder::class,
    PhotoSeeder::class,
    ExceptionSeeder::class,

    ReservationSeeder::class,
    ReviewSeeder::class,
]);
        // $this->call([
        //     CategorieSeeder::class,
        //     UserSeeder::class,
        //     // Provider
        //     \Database\Seeders\Provider\ServiceSeeder::class,
        //     \Database\Seeders\Provider\PhotoSeeder::class,
        //     // \Database\Seeders\Provider\PlanningSeeder::class,
        //     \Database\Seeders\Provider\ExceptionSeeder::class,
        //     // Client
        //     \Database\Seeders\Client\ReservationSeeder::class,
        //     \Database\Seeders\Client\ReviewSeeder::class,

         

        // ]);
    }
}
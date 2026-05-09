<?php

namespace Database\Seeders\Client;

use App\Models\Client\Reservation;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        Reservation::factory(17)->create();
    }
}

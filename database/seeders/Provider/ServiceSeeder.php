<?php

namespace Database\Seeders\Provider;

use App\Models\Provider\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        Service::factory(17)->create();
    }
}

<?php

namespace Database\Seeders\Client;

use App\Models\Client\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        Client::factory(17)->create();
    }
}

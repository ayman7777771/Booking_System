<?php

namespace Database\Seeders\Provider;

use App\Models\Provider\Provider;
use Illuminate\Database\Seeder;

class ProviderSeeder extends Seeder
{
    public function run(): void
    {
        Provider::factory(17)->create();
    }
}

<?php

namespace Database\Seeders\Provider;

use App\Models\Provider\Exception as ProviderException;
use Illuminate\Database\Seeder;

class ExceptionSeeder extends Seeder
{
    public function run(): void
    {
        ProviderException::factory(17)->create();
    }
}

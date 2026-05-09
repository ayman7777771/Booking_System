<?php

namespace Database\Seeders\Provider;

use App\Models\Provider\Photo;
use Illuminate\Database\Seeder;

class PhotoSeeder extends Seeder
{
    public function run(): void
    {
        Photo::factory(17)->create();
    }
}

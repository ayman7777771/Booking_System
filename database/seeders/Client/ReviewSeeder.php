<?php

namespace Database\Seeders\Client;

use App\Models\Client\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        Review::factory(17)->create();
    }
}

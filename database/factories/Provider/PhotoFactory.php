<?php

namespace Database\Factories\Provider;

use App\Models\Provider\Photo;
use App\Models\Provider\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PhotoFactory extends Factory
{
    protected $model = Photo::class;

    public function definition(): array
    {
        $storedServiceImages = Storage::disk('public')->files('services/photos');

        return [
            'service_id' => Service::inRandomOrder()->first()?->id,
            'path' => $storedServiceImages
                ? fake()->randomElement($storedServiceImages)
                : 'https://picsum.photos/seed/service-'.Str::uuid().'/800/520',
        ];
    }
}

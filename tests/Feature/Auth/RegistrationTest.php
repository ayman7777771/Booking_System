<?php

use App\Models\Categorie;
use App\Models\Ville;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new clients are redirected to the dashboard after registration', function () {
    $ville = Ville::create(['name' => 'Casablanca']);

    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'tel' => '0612345678',
        'ville_id' => $ville->id,
        'role' => 'client',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard'));
});

test('new providers are redirected to their public profile after registration', function () {
    Storage::fake('public');

    $ville = Ville::create(['name' => 'Rabat']);
    $category = Categorie::create(['name' => 'Consultation']);

    $response = $this->post('/register', [
        'name' => 'Provider User',
        'email' => 'provider@example.com',
        'tel' => '0612345679',
        'ville_id' => $ville->id,
        'role' => 'provider',
        'password' => 'password',
        'password_confirmation' => 'password',
        'photo_profile' => UploadedFile::fake()->image('profile.jpg'),
        'main_photo' => UploadedFile::fake()->image('cover.jpg'),
        'category_id' => $category->id,
        'description' => 'A complete provider profile description.',
        'service' => 'Consultation',
        'longitude' => -7.5898,
        'latitude' => 33.5731,
    ]);

    $this->assertAuthenticated();
    $provider = auth()->user()->provider;

    $response->assertRedirect(route('provider.profile', $provider));
});

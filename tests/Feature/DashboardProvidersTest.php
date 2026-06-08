<?php

use App\Models\Categorie;
use App\Models\Provider\Provider;
use App\Models\User;
use App\Models\Ville;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('shows providers with their profile and location data on the dashboard', function () {
    $city = Ville::create(['name' => 'Fes']);
    $category = Categorie::create(['name' => 'Coiffure']);
    $client = User::factory()->create(['role' => 'client']);
    $providerUser = User::factory()->create([
        'name' => 'Yassine Barber',
        'photoProfile' => 'profiles/yassine.jpg',
        'role' => 'provider',
        'ville_id' => $city->id,
    ]);
    $provider = Provider::factory()
        ->for($providerUser)
        ->for($category, 'categorie')
        ->create([
            'main_photo' => 'providers/barber-cover.jpg',
            'service' => 'Coiffeur de Fes',
        ]);

    $this->actingAs($client)
        ->get(route('dashboard'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard')
            ->where('providers.data.0.id', $provider->id)
            ->where('providers.data.0.main_photo', 'providers/barber-cover.jpg')
            ->where('providers.data.0.service', 'Coiffeur de Fes')
            ->where('providers.data.0.user.name', 'Yassine Barber')
            ->where('providers.data.0.user.photoProfile', 'profiles/yassine.jpg')
            ->where('providers.data.0.user.ville.name', 'Fes')
            ->where('providers.data.0.categorie.name', 'Coiffure')
        );
});

it('filters dashboard providers by user ville id', function () {
    $fes = Ville::create(['name' => 'Fes']);
    $rabat = Ville::create(['name' => 'Rabat']);
    $category = Categorie::create(['name' => 'Services']);
    $client = User::factory()->create(['role' => 'client']);
    $fesProviderUser = User::factory()->create([
        'role' => 'provider',
        'ville_id' => $fes->id,
    ]);
    $rabatProviderUser = User::factory()->create([
        'role' => 'provider',
        'ville_id' => $rabat->id,
    ]);
    $fesProvider = Provider::factory()
        ->for($fesProviderUser)
        ->for($category, 'categorie')
        ->create(['service' => 'Coiffeur de Fes']);
    Provider::factory()
        ->for($rabatProviderUser)
        ->for($category, 'categorie')
        ->create(['service' => 'Coiffeur de Rabat']);

    $this->actingAs($client)
        ->get(route('dashboard', ['ville' => $fes->id]))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard')
            ->has('providers.data', 1)
            ->where('providers.data.0.id', $fesProvider->id)
            ->where('providers.data.0.user.ville.id', $fes->id)
            ->where('filters.ville', (string) $fes->id)
        );
});

it('fills factory provider and user images when storage folders are empty', function () {
    Storage::fake('public');

    $category = Categorie::create(['name' => 'Services']);
    $providerUser = User::factory()->create(['role' => 'provider']);
    $provider = Provider::factory()
        ->for($providerUser)
        ->for($category, 'categorie')
        ->create();

    expect($providerUser->photoProfile)->toStartWith('http')
        ->and($provider->main_photo)->toStartWith('http');
});

<?php

use App\Models\Categorie;
use App\Models\Client\Client;
use App\Models\Client\Reservation;
use App\Models\Provider\Planning;
use App\Models\Provider\Provider;
use App\Models\Provider\Service;
use App\Models\User;
use Carbon\Carbon;

it('stores a reservation request for an available provider hour', function () {
    $reservationDate = Carbon::parse('next monday')->toDateString();
    $category = Categorie::create(['name' => 'Cleaning']);
    $providerUser = User::factory()->create(['role' => 'provider']);
    $provider = Provider::factory()
        ->for($providerUser)
        ->for($category, 'categorie')
        ->create();
    $service = Service::factory()->for($provider)->create(['duration' => 60]);
    Planning::create([
        'provider_id' => $provider->id,
        'day' => 'Lun',
        'time' => ['09:00'],
    ]);

    $clientUser = User::factory()->create(['role' => 'client']);
    $client = Client::factory()->for($clientUser)->create();

    $this->actingAs($clientUser)
        ->post(route('reservations.store'), [
            'service_id' => $service->id,
            'date' => $reservationDate,
            'heure' => '09:00',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('reservations', [
        'client_id' => $client->id,
        'service_id' => $service->id,
        'date' => $reservationDate,
        'heure' => '09:00',
        'statut' => 'en_attente',
        'duration' => 60,
    ]);
});

it('stores a reservation request for a provider user', function () {
    $reservationDate = Carbon::parse('next monday')->toDateString();
    $category = Categorie::create(['name' => 'Cleaning']);
    $providerUser = User::factory()->create(['role' => 'provider']);
    $provider = Provider::factory()
        ->for($providerUser)
        ->for($category, 'categorie')
        ->create();
    $service = Service::factory()->for($provider)->create(['duration' => 45]);
    Planning::create([
        'provider_id' => $provider->id,
        'day' => 'Lun',
        'time' => ['09:00'],
    ]);

    $this->actingAs($providerUser)
        ->post(route('reservations.store'), [
            'service_id' => $service->id,
            'date' => $reservationDate,
            'heure' => '09:00',
        ])
        ->assertRedirect();

    $client = Client::where('user_id', $providerUser->id)->first();

    expect($client)->not->toBeNull();

    $this->assertDatabaseHas('reservations', [
        'client_id' => $client->id,
        'service_id' => $service->id,
        'date' => $reservationDate,
        'heure' => '09:00',
        'statut' => 'en_attente',
        'duration' => 45,
    ]);
});

it('lets the owning provider accept a reservation', function () {
    $category = Categorie::create(['name' => 'Cleaning']);
    $providerUser = User::factory()->create(['role' => 'provider']);
    $provider = Provider::factory()
        ->for($providerUser)
        ->for($category, 'categorie')
        ->create();
    $service = Service::factory()->for($provider)->create();

    $clientUser = User::factory()->create(['role' => 'client']);
    $client = Client::factory()->for($clientUser)->create();
    $reservation = Reservation::create([
        'client_id' => $client->id,
        'service_id' => $service->id,
        'date' => '2026-06-01',
        'heure' => '09:00',
        'statut' => 'en_attente',
        'estEngage' => false,
    ]);

    $this->actingAs($providerUser)
        ->patch(route('provider.reservations.accept', $reservation))
        ->assertRedirect();

    $this->assertDatabaseHas('reservations', [
        'id' => $reservation->id,
        'statut' => 'acceptee',
        'estEngage' => true,
    ]);
});

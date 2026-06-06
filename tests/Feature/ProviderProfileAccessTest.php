<?php

use App\Models\Categorie;
use App\Models\Provider\Provider;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('allows guests to view a provider public profile', function () {
    $category = Categorie::create(['name' => 'Consultation']);
    $user = User::factory()->create(['role' => 'provider']);
    $provider = Provider::factory()
        ->for($user)
        ->for($category, 'categorie')
        ->create();

    $this->get(route('provider.profile', $provider))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Provider/Profile')
            ->has('provider')
        );
});

it('prevents guests from opening the provider dashboard', function () {
    $this->get(route('provider.dashboard'))
        ->assertRedirect(route('login'));
});

it('shows the provider dashboard to the owning provider', function () {
    $category = Categorie::create(['name' => 'Consultation']);
    $user = User::factory()->create(['role' => 'provider']);
    $provider = Provider::factory()
        ->for($user)
        ->for($category, 'categorie')
        ->create();

    $this->actingAs($user)
        ->get(route('provider.dashboard'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Provider/Dashboard')
            ->where('provider.id', $provider->id)
            ->has('reservations')
        );
});

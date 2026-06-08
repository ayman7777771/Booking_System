<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('returns a successful response', function () {
    $this->get('/')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page->component('Welcome'));
});

it('shows the welcome page to authenticated clients', function () {
    $client = User::factory()->create(['role' => 'client']);

    $this->actingAs($client)
        ->get('/')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page->component('Welcome'));
});

it('shows the welcome page to authenticated providers', function () {
    $providerUser = User::factory()->create(['role' => 'provider']);

    $this->actingAs($providerUser)
        ->get('/')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page->component('Welcome'));
});

it('shows the welcome page to authenticated admins', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $this->actingAs($admin)
        ->get('/')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page->component('Welcome'));
});

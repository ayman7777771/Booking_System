<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('allows admins to open the dashboard and users page', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    User::factory()->create(['role' => 'client']);
    User::factory()->create(['role' => 'provider']);

    $this->actingAs($admin)
        ->get(route('admin.dashboard'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Dashboard')
            ->where('stats.total_clients', 1)
            ->where('stats.total_providers', 1)
        );

    $this->actingAs($admin)
        ->get(route('admin.users.index'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Users/Index')
            ->has('users', 3)
        );
});

it('prevents non admins from opening admin pages', function () {
    $client = User::factory()->create(['role' => 'client']);

    $this->actingAs($client)
        ->get(route('admin.dashboard'))
        ->assertRedirect('/dashboard');
});

it('redirects admins away from the client dashboard', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $this->actingAs($admin)
        ->get(route('dashboard'))
        ->assertRedirect(route('admin.dashboard'));
});

it('lets admins toggle and delete non admin users', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $client = User::factory()->create(['role' => 'client', 'statut' => true]);

    $this->actingAs($admin)
        ->patch(route('admin.users.status', $client))
        ->assertRedirect();

    expect($client->refresh()->statut)->toBeFalse();

    $this->actingAs($admin)
        ->delete(route('admin.users.destroy', $client))
        ->assertRedirect();

    $this->assertModelMissing($client);
});

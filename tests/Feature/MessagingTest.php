<?php

use App\Models\Message;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('lets clients and providers exchange messages', function () {
    $client = User::factory()->create(['role' => 'client']);
    $provider = User::factory()->create(['role' => 'provider']);

    $this->actingAs($client)
        ->post(route('messages.store'), [
            'receiver_id' => $provider->id,
            'contenu' => 'Salam, wach disponible?',
        ])
        ->assertRedirect(route('messages.index', $provider));

    $this->assertDatabaseHas('messages', [
        'sender_id' => $client->id,
        'receiver_id' => $provider->id,
        'contenu' => 'Salam, wach disponible?',
        'lu' => false,
    ]);

    $this->actingAs($provider)
        ->get(route('messages.index', $client))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Messages/Index')
            ->where('selectedUser.id', $client->id)
            ->where('messages.0.contenu', 'Salam, wach disponible?')
            ->where('messages.0.mine', false)
        );

    expect(Message::first()->lu)->toBeTrue();
});

it('blocks messages inside the same role', function () {
    $firstClient = User::factory()->create(['role' => 'client']);
    $secondClient = User::factory()->create(['role' => 'client']);

    $this->actingAs($firstClient)
        ->post(route('messages.store'), [
            'receiver_id' => $secondClient->id,
            'contenu' => 'Hello',
        ])
        ->assertForbidden();

    expect(Message::count())->toBe(0);
});

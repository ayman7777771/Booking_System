<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::with('user', 'reservations', 'reviews')->get();
        return response()->json($clients);
    }

    public function store(Request $request)
    {
        $client = Client::create($request->validated());
        return response()->json($client, 201);
    }

    public function show(Client $client)
    {
        return response()->json($client->load('user', 'reservations', 'reviews'));
    }

    public function update(Request $request, Client $client)
    {
        $client->update($request->validated());
        return response()->json($client);
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(['message' => 'Client deleted']);
    }
}

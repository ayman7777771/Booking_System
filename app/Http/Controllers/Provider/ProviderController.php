<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Provider\Provider;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
    public function index()
    {
        $providers = Provider::with('user', 'categorie', 'services', 'reviews')->get();
        return response()->json($providers);
    }

    public function store(Request $request)
    {
        $provider = Provider::create($request->validated());
        return response()->json($provider, 201);
    }

    public function show(Provider $provider)
    {
        return response()->json($provider->load('user', 'categorie', 'services', 'reviews'));
    }

    public function update(Request $request, Provider $provider)
    {
        $provider->update($request->validated());
        return response()->json($provider);
    }

    public function destroy(Provider $provider)
    {
        $provider->delete();
        return response()->json(['message' => 'Provider deleted']);
    }

    public function updateRating(Provider $provider)
    {
        $avgRating = $provider->reviews()->avg('rating');
        $provider->update(['rating' => $avgRating]);
        return response()->json($provider);
    }
}

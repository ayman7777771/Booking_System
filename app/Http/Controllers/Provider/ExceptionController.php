<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Provider\Exception as ProviderException;
use Illuminate\Http\Request;

class ExceptionController extends Controller
{
    public function index()
    {
        $exceptions = ProviderException::with('provider')->get();
        return response()->json($exceptions);
    }

    public function store(Request $request)
    {
        $exception = ProviderException::create($request->validated());
        return response()->json($exception, 201);
    }

    public function show(ProviderException $exception)
    {
        return response()->json($exception->load('provider'));
    }

    public function update(Request $request, ProviderException $exception)
    {
        $exception->update($request->validated());
        return response()->json($exception);
    }

    public function destroy(ProviderException $exception)
    {
        $exception->delete();
        return response()->json(['message' => 'Exception deleted']);
    }

    public function byProvider($providerId)
    {
        $exceptions = ProviderException::where('provider_id', $providerId)->get();
        return response()->json($exceptions);
    }
}

<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Provider\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('provider', 'reservations')->get();
        return response()->json($services);
    }

    public function store(Request $request)
    {
        $service = Service::create($request->validated());
        return response()->json($service, 201);
    }

    public function show(Service $service)
    {
        return response()->json($service->load('provider', 'reservations'));
    }

    public function update(Request $request, Service $service)
    {
        $service->update($request->validated());
        return response()->json($service);
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(['message' => 'Service deleted']);
    }

    public function byProvider($providerId)
    {
        $services = Service::where('provider_id', $providerId)->get();
        return response()->json($services);
    }
}

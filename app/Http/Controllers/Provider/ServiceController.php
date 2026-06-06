<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Requests\Provider\ServiceRequest;
use App\Models\Provider\Service;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class ServiceController extends Controller
{
    use AuthorizesRequests;

    public function create()
    {
        return Inertia::render('Provider/ServiceTest');
    }

    public function store(ServiceRequest $request)
    {
        $this->authorize('create', Service::class);

        Service::create([
            'provider_id' => auth()->user()->provider->id,
            ...$request->validated(),
        ]);

        return back()->with('success', 'Service added successfully.');
    }

    public function update(ServiceRequest $request, Service $service)
    {
        $this->authorize('update', $service);

        $service->update($request->validated());

        return back()->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        $this->authorize('delete', $service);

        $service->delete();

        return back()->with('success', 'Service deleted successfully.');
    }
}

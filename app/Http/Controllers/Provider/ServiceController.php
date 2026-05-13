<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Provider\Service;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Provider\ServiceRequest;
use Inertia\Inertia;
class ServiceController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        // Kan-jibu l-services dyal l-provider li m-connecti
        $provider = Auth::user()->provider;
        $services = Service::where('provider_id', $provider->id)
            ->with('reservations')
            ->latest()
            ->get();

        return Inertia::render('Provider/ServicesTable', [
            'services' => $services,
        ]);
    }

    public function create()
    {
        return Inertia::render('Provider/ServiceTest');
    }


    public function store(ServiceRequest $request)
    {

    }

    public function update(ServiceRequest $request, Service $service)
    {
        $this->authorize('update', $service);
        $service->update($request->validated());
        return back();
    }

    public function destroy(Service $service)
    {
        $this->authorize('delete', $service);
        $service->delete();
        return back();
    }
}

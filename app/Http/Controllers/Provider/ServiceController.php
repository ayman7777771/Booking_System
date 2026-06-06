<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
<<<<<<< HEAD
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Provider\Service;
use Illuminate\Support\Facades\Auth;
=======
>>>>>>> c751ca930e8ae6edbd4190fab39e797edabd05dc
use App\Http\Requests\Provider\ServiceRequest;
use App\Models\Provider\Service;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;
<<<<<<< HEAD
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

        return Inertia::render('Provider/Profile', [
            'services' => $services,
        ]);
    }
=======

class ServiceController extends Controller
{
    use AuthorizesRequests;
>>>>>>> c751ca930e8ae6edbd4190fab39e797edabd05dc

    public function create()
    {
        return Inertia::render('Provider/ServiceTest');
    }


    public function store(ServiceRequest $request)
    {
<<<<<<< HEAD

=======
        $this->authorize('create', Service::class);

        Service::create([
            'provider_id' => auth()->user()->provider->id,
            ...$request->validated(),
        ]);

        return back()->with('success', 'Service added successfully.');
>>>>>>> c751ca930e8ae6edbd4190fab39e797edabd05dc
    }

    public function update(ServiceRequest $request, Service $service)
    {
        $this->authorize('update', $service);
<<<<<<< HEAD
        $service->update($request->validated());
        return back();
=======

        $service->update($request->validated());

        return back()->with('success', 'Service updated successfully.');
>>>>>>> c751ca930e8ae6edbd4190fab39e797edabd05dc
    }

    public function destroy(Service $service)
    {
        $this->authorize('delete', $service);
        $service->delete();
<<<<<<< HEAD
        return back();
=======

        return back()->with('success', 'Service deleted successfully.');
>>>>>>> c751ca930e8ae6edbd4190fab39e797edabd05dc
    }
}

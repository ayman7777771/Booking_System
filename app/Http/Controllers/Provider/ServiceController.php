<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Provider\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Provider\ServiceRequest;
use Inertia\Inertia;


class ServiceController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $provider = Auth::user()->provider;

        $services = Service::where('provider_id', $provider->id)
            ->latest()
            ->get();

        return Inertia::render('Provider/Profile', [
            'services' => $services,
        ]);
    }

    public function create()
    {
        return Inertia::render('Provider/ServiceTest');
    }

    public function store(ServiceRequest $request)
    {
        Service::create([
             'provider_id' => auth()->user()->provider->id,
            ...$request->all(),
        ]);

        return redirect()->route('provider.services.index');
    }

    public function update(ServiceRequest $request, Service $service)
    {
        $this->authorize('update', $service);

        $service->update($request->all());

        return back();
    }

    public function destroy(Service $service)
    {
        $this->authorize('delete', $service);

        $service->delete();

        return back();
    }
}
 
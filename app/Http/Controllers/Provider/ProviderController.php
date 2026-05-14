<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\CategorieController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Provider\ServiceRequest;
use App\Models\Categorie;
use App\Models\Provider\Provider;
use App\Models\Provider\Service;
use App\Models\Ville;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProviderController extends Controller
{
   public function index(Request $request)
{
    $search = $request->search;
    $providers = Provider::with(['user.ville', 'category'])
        ->when($search, fn ($q) =>
            $q->where(function ($q) use ($search) {
                $q->where('service', 'like', "%{$search}%")
                  ->orWhereHas('user', fn ($uq) =>
                      $uq->where('name', 'like', "%{$search}%")
                  );
            })
        )
        ->latest()
        ->paginate(15);

    return Inertia::render('Discover', [
        'providers' => $providers,
        'filters' => compact('search'),
        'villes' => Ville::all(),
        'categories' => Categorie::all(),
    ]);
}
    private function getProviderData()
    {
        $provider = auth()->user()->provider;
        return $provider->load([
            'user.ville',
            'categorie',
            'services',
            'plannings',
            'photos'
        ]);
    }

    public function dashboard()
    {
        return Inertia::render('Provider/Dashboard', [
            'provider' => $this->getProviderData()
        ]);
    }

    public function profile()
    {
        $provider = $this->getProviderData();

    $reviews = $provider->reviews()
        ->with('user')
        ->latest()
        ->paginate(5);

    return Inertia::render('Provider/Profile', [
        'provider' => $provider,
        'reviews' => $reviews
    ]);
       
    }
    public function update(ServiceRequest $request, Service $service)
    {
    $this->authorize('update', $service);

    $service->update($request->validated());

    return back();
    }
      
}

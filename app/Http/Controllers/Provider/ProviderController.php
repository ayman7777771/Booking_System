<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProviderRequest;
use App\Models\Categorie;
use App\Models\Provider\Provider;
use App\Models\Ville;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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

    return Inertia::render('Dashboard', [
        'providers' => $providers,
        'filters' => compact('search'),
        'categories' => Categorie::orderBy('name')->get(),
        'villes' => Ville::orderBy('name')->get(),
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
        ->paginate(11);
        
    return Inertia::render('Provider/Profile', [
        'provider' => $provider,
        'reviews' => $reviews
    ]);
       
    }
    public function update(ProviderRequest $request, Provider $provider)
    {
    $this->authorize('update', $provider);
    $data = $request->validated();
    if ($request->hasFile('main_photo')) {
        if ($provider->main_photo) {
            Storage::disk('public')->delete($provider->main_photo);
    }
    $path = $request->file('main_photo')
        ->store('providers', 'public');
    $data['main_photo'] = $path;
    }
    $provider->update($data);
    return back()->with('success', 'Profile updated successfully.');
    }  
}

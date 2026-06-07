<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Requests\Provider\ProviderRequest;
use App\Models\Categorie;
use App\Models\Client\Reservation;
use App\Models\Provider\Provider;
use App\Models\Ville;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class ProviderController extends Controller
{
    use AuthorizesRequests;
public function index(Request $request)
{
    $search = $request->search;
    $category = $request->category;
    $ville = $request->ville;

    $providers = Provider::with(['user.ville', 'categorie'])
        ->when($search, function ($q) use ($search) {
            $q->where(function ($q) use ($search) {
                $q->where('service', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%");
                  });
            });
        })
        ->when($category, function ($q) use ($category) {
            $q->where('categorie_id', $category);
        })
        ->when($ville, function ($q) use ($ville) {
            $q->whereHas('user', function ($uq) use ($ville) {
                $uq->where('ville_id', $ville);
            });
        })
        ->latest()
        ->paginate(15)
        ->withQueryString();

    return Inertia::render('Dashboard', [
        'providers' => $providers,
        'filters' => [
            'search' => $search,
            'category' => $category,
            'ville' => $ville,
        ],
        'categories' => Categorie::orderBy('name')->get(),
        'villes' => Ville::orderBy('name')->get(),
    ]);
}

    private function getProviderData(Provider $provider)
    {
        return $provider->load([
            'user.ville',
            'categorie',
            'services',
            'plannings',
            'services.photos',
        ]);
    }

    public function dashboard()
    {
        // $provider = auth()->user()->provider;
        // dd($provider->toArray());
        $provider = Provider::where('user_id', auth()->id())->firstOrFail();

        abort_if(! $provider, 404);

        return Inertia::render('Provider/Dashboard', [
            'provider' => $this->getProviderData($provider),
            'categories' => Categorie::orderBy('name')->get(['id', 'name']),
            'reservations' => Reservation::with(['client.user', 'service'])
                ->whereHas('service', fn ($query) => $query->where('provider_id', $provider->id))
                ->latest()
                ->get(),
        ]);
    }

    public function profile(Provider $provider)
    {
        $provider = $this->getProviderData($provider);
        $reviews = $provider->services()
            ->with(['reviews.user'])
            ->get()
            ->pluck('reviews')
            ->flatten();

        return Inertia::render('Provider/Profile', [
            'provider' => $provider,
            'reviews' => $reviews,
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
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Categorie;
use App\Models\Client\Client;
use App\Models\Provider\Planning;
use App\Models\Provider\Provider;
use App\Models\User;
use App\Models\Ville;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'categories' => Categorie::orderBy('name')->get(),
            'villes' => Ville::orderBy('name')->get(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(RegisterRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $photoProfilePath = null;
        $mainImagePath = null;

        if ($request->hasFile('photo_profile')) {
            $photoProfilePath = $request->file('photo_profile')->store('profiles', 'public');
        }

        if ($request->hasFile('main_photo')) {
            $mainImagePath = $request->file('main_photo')->store('providers', 'public');
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'tel' => $data['tel'],
            'password' => Hash::make($data['password']),
            'ville_id' => $data['ville_id'],
            'photoProfile' => $photoProfilePath,
            'role' => $data['role'],
            'statut' => true,
        ]);

        $provider = null;

        if ($data['role'] === 'provider') {
            $provider = $this->createProvider($user, $data, $mainImagePath);
            if (isset($data['working_hours'])) {
                $this->createPlannings($provider, $data['working_hours']);
            }
        } else {
            Client::create([
                'user_id' => $user->id,
                'Avertissement' => null,
            ]);
        }

        event(new Registered($user));
        Auth::login($user);

        return redirect($this->redirectPathFor($user->setRelation('provider', $provider)));
    }

    private function redirectPathFor(User $user): string
    {
        if ($user->role === 'admin') {
            return route('admin.dashboard');
        }

        if ($user->role === 'provider' && $user->provider) {
            return route('provider.profile', $user->provider);
        }

        return route('dashboard');
    }

    private function createProvider(User $user, array $data, ?string $mainImagePath): Provider
    {
        return Provider::create([
            'user_id' => $user->id,
            'categorie_id' => $data['category_id'],
            'description' => $data['description'],
            'service' => $data['service'],
            'main_photo' => $mainImagePath,
            'longitude' => (float) ($data['longitude']),
            'latitude' => (float) ($data['latitude']),
        ]);
    }

    private function createPlannings(Provider $provider, array $workingHours): void
    {

        $days = [
            'lun' => 'Lun',
            'mar' => 'Mar',
            'mer' => 'Mer',
            'jeu' => 'Jeu',
            'ven' => 'Ven',
            'sam' => 'Sam',
            'dim' => 'Dim',
        ];

        foreach ($days as $key => $d) {
            if (! empty($workingHours[$key])) {
                Planning::create([
                    'provider_id' => $provider->id,
                    'day' => $d,
                    'time' => $workingHours[$key],
                ]);
            }
        }
    }
}

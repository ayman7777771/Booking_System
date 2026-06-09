<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client\Client;
use App\Models\Client\Reservation;
use App\Models\Provider\Service;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    private const DAY_NAMES = [
        'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam',
    ];

    public function index(Request $request): Response
    {
        $user = $request->user();

        $query = Reservation::query()
            ->with(['client.user', 'service.provider.user'])
            ->latest();

        if ($user->role === 'provider') {
            $provider = $user->provider;

            abort_if(! $provider, 403);

            $query->whereHas('service', function ($serviceQuery) use ($provider) {
                $serviceQuery->where('provider_id', $provider->id);
            });
        } elseif ($user->role !== 'admin') {
            $client = Client::firstOrCreate(
                ['user_id' => $user->id],
                ['Avertissement' => null],
            );

            $query->where('client_id', $client->id);
        }

        return Inertia::render('MesDemandes', [
            'reservations' => $this->formatReservations($query->get()),
            'mode' => $user->role,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'service_id' => ['required', 'integer', 'exists:services,id'],
            'date' => ['required', 'date', 'after_or_equal:today'],
            'heure' => ['required', 'date_format:H:i'],
        ]);

        $client = Client::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['Avertissement' => null],
        );

        $service = Service::with('provider.plannings')->findOrFail($data['service_id']);

        $day = self::DAY_NAMES[Carbon::parse($data['date'])->dayOfWeek];

        $planning = $service->provider->plannings->firstWhere('day', $day);

        if (! $planning || ! in_array($data['heure'], $planning->time ?? [], true)) {
            throw ValidationException::withMessages([
                'heure' => 'Cette heure n est pas disponible.',
            ]);
        }

        Reservation::create([
            'service_id' => $service->id,
            'date' => $data['date'],
            'heure' => $data['heure'],
            'client_id' => $client->id,
            'duration' => $service->duration,
            'statut' => 'en_attente',
            'estEngage' => false,
        ]);

        return back()->with('success', 'Demande de reservation envoyee.');
    }

    public function show(Reservation $reservation)
    {
        $this->authorizeAccess($reservation);

        return Inertia::render('MesDemandes', [
            'reservations' => $this->formatReservations(collect([$reservation->load('client.user', 'service.provider.user')])),
            'mode' => Auth::user()?->role,
        ]);
    }

    public function update(Request $request, Reservation $reservation): RedirectResponse
    {
        $this->authorizeAccess($reservation);

        $data = $request->validate([
            'statut' => 'sometimes|string',
            'estEngage' => 'sometimes|boolean',
        ]);

        $reservation->update($data);

        return back()->with('success', 'Reservation mise a jour.');
    }

    public function accept(Request $request, Reservation $reservation): RedirectResponse
    {
        $this->authorizeProviderReservation($request, $reservation);

        $reservation->update([
            'statut' => 'acceptee',
            'estEngage' => true,
        ]);

        return back()->with('success', 'Reservation acceptee.');
    }

    public function refuse(Request $request, Reservation $reservation): RedirectResponse
    {
        $this->authorizeProviderReservation($request, $reservation);

        $reservation->update([
            'statut' => 'refusee',
            'estEngage' => false,
        ]);

        return back()->with('success', 'Reservation refusee.');
    }

    private function authorizeProviderReservation(Request $request, Reservation $reservation): void
    {
        $provider = $request->user()?->provider;

        abort_if(!$provider, 403);

        abort_if(! $reservation->service || $reservation->service->provider_id !== $provider->id, 403);
    }

    private function authorizeAccess(Reservation $reservation): void
    {
        $user = Auth::user();

        abort_if(! $user, 403);

        if ($user->role === 'admin') {
            return;
        }

        if ($user->role === 'provider') {
            abort_if(
                ! $user->provider || ! $reservation->service || $reservation->service->provider_id !== $user->provider->id,
                403
            );

            return;
        }

        abort_if($reservation->client?->user_id !== $user->id, 403);
    }

    private function formatReservations(Collection $reservations): array
    {
        return $reservations->map(fn (Reservation $reservation) => [
            'id' => $reservation->id,
            'date' => $reservation->date?->format('Y-m-d'),
            'heure' => $reservation->heure,
            'duration' => $reservation->duration,
            'statut' => $reservation->statut,
            'estEngage' => (bool) $reservation->estEngage,
            'service' => $reservation->service?->name,
            'prestataire' => $reservation->service?->provider?->user?->name,
            'client' => $reservation->client?->user?->name,
            'created_at' => $reservation->created_at?->format('Y-m-d H:i'),
        ])->values()->all();
    }
}

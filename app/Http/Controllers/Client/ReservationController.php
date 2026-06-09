<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client\Client;
use App\Models\Client\Reservation;
use App\Models\Provider\Service;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class ReservationController extends Controller
{
    private const DAY_NAMES = [
        'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam',
    ];

    public function index()
    {
        try {
            $user = Auth::user();
            if ($user?->provider) {

                $providerReservations = Reservation::with(['client.user', 'service'])
                    ->whereHas('service', function ($query) use ($user) {
                        $query->where('provider_id', $user->provider->id);
                    })
                    ->latest()
                    ->get();
                return Inertia::render('Provider/DashboardReservations', [
                    'reservations' => $providerReservations
                ]);
            }

            $reservations = Reservation::with(['service.provider.utilisateur'])
                ->where('client_id', $user->id)
                ->latest()
                ->get();

            return Inertia::render('MyReservations', [
                'reservations' => $reservations
            ]);

        } catch (\Throwable $e) {
            report($e);

            return back()->with('error', 'Something went wrong.');
        }
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

    if (!$planning || !in_array($data['heure'], $planning->time ?? [], true)) {
        throw ValidationException::withMessages([
            'heure' => 'This hour is not available.',
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

    return back()->with('success', 'Reservation request sent.');
}

    public function show(Reservation $reservation)
    {
        $this->authorizeAccess($reservation);

        return Inertia::render('Client/ReservationShow', [
            'reservation' => $reservation->load('client', 'service')
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

        return back()->with('success', 'Reservation updated.');
    }

    public function accept(Request $request, Reservation $reservation): RedirectResponse
    {
        $this->authorizeProviderReservation($request, $reservation);

        $reservation->update([
            'statut' => 'acceptee',
            'estEngage' => true,
        ]);

        return back()->with('success', 'Reservation accepted.');
    }

    public function refuse(Request $request, Reservation $reservation): RedirectResponse
    {
        $this->authorizeProviderReservation($request, $reservation);

        $reservation->update([
            'statut' => 'refusee',
            'estEngage' => false,
        ]);

        return back()->with('success', 'Reservation refused.');
    }

    private function authorizeProviderReservation(Request $request, Reservation $reservation): void
    {
        $provider = $request->user()?->provider;

        abort_if(!$provider, 403);

        abort_if(
            !$reservation->service || $reservation->service->provider_id !== $provider->id,
            403
        );
    }

    private function authorizeAccess(Reservation $reservation): void
    {
        $user = Auth::user();

        abort_if(
            !$user || ($reservation->client_id !== $user->id && !$user->provider),
            403
        );
    }
}
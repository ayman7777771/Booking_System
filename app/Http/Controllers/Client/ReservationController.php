<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client\Client;
use App\Models\Client\Reservation;
use App\Models\Provider\Service;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ReservationController extends Controller
{
    private const DAY_NAMES = [
        'Dim',
        'Lun',
        'Mar',
        'Mer',
        'Jeu',
        'Ven',
        'Sam',
    ];

    public function index()
    {
        $reservations = Reservation::with('client', 'service')->get();

        return response()->json($reservations);
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
                'heure' => 'This hour is not available.',
            ]);
        }

        if (Reservation::query()
            ->where('service_id', $service->id)
            ->where('date', $data['date'])
            ->where('heure', $data['heure'])
            ->whereIn('statut', ['en_attente', 'acceptee'])
            ->exists()) {
            throw ValidationException::withMessages([
                'heure' => 'This hour is already reserved.',
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
        return response()->json($reservation->load('client', 'service'));
    }

    public function update(Request $request, Reservation $reservation)
    {
        $reservation->update($request->validated());

        return response()->json($reservation);
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return response()->json(['message' => 'Reservation deleted']);
    }

    public function cancel(Reservation $reservation)
    {
        $reservation->update(['statut' => 'cancelled']);

        return response()->json($reservation);
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

        abort_if(! $provider, 403);
        abort_if($reservation->service()->where('provider_id', $provider->id)->doesntExist(), 403);
    }
}

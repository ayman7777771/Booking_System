<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        try {
        $user = Auth::user();

        // 1. ILA KAN USER "PROVIDER"
        if ($user && $user->provider) {
            // S-iyfet l-provider l-page dyalu b les réservations dyalu direct
            $providerReservations = \App\Models\Client\Reservation::with(['client.user', 'service'])
                ->whereHas('service', function($query) use ($user) {
                    $query->where('provider_id', $user->provider->id);
                })
                ->latest()
                ->get();

            return Inertia::render('Provider/DashboardReservations', [
                'reservations' => $providerReservations
            ]);
        }

        // 2. ILA KAN USER "CLIENT"
        // Hna khdemna b l-code dyalk walakin zdna t-akkadna mn l-columns
        $reservations = Reservation::with(['service.provider.utilisateur']) 
            ->where('client_id', Auth::id())
            ->get();

        return Inertia::render('Client/MyReservations', [
            'reservations' => $reservations
        ]);

    } catch (\Exception $e) {
        // Hād l-blasa hya li ghadi t-mna3 500 error u t-biyen lik r-risala d l-mouchkil s-afiya f l-wjeh!
        dd("L-Mouchkil jayi mn had l-stire: " . $e->getMessage());
    }
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'date_reservation' => 'required|date|after:today',
        ]);

        // 2. Create Reservation
        Reservation::create([
            'client_id' => Auth::id(),
            'service_id' => $request->service_id,
            'date_reservation' => $request->date_reservation,
            'statut' => 'en_attente',
        ]);

        return back()->with('success', 'Réservation dert b-najaḥ!');
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
        $reservation->update(['status' => 'cancelled']);
        return response()->json($reservation);
    }
}

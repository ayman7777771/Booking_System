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
        $reservations = Reservation::with('service.provider.utilisateur') // Jbed smiyt l-coiffeur/service
        ->where('client_id', Auth::id())
        ->orderBy('date', 'desc')
        ->get();

    return Inertia::render('Client/MyReservations', [
        'reservations' => $reservations
    ]);
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

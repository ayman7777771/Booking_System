<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with('client', 'service')->get();
        return response()->json($reservations);
    }

    public function store(Request $request)
    {
        $reservation = Reservation::create($request->validated());
        return response()->json($reservation, 201);
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

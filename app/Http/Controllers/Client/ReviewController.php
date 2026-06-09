<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with('service')
            ->where('client_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Client/Reviews', [
            'reviews' => $reviews,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'nullable|string|max:500',
        ]);

        $review = Review::updateOrCreate(
            [
                'client_id' => Auth::id(),
                'service_id' => $request->service_id,
            ],
            [
                'note' => $request->note,
                'commentaire' => $request->commentaire,
            ]
        );

        $service = $review->service;
        if ($service) {
            $average = $service->reviews()->avg('note');
            $service->update(['moyenne_note' => $average]);
        }

        return back()->with('success', 'Avis bien enregistré !');
    }

    public function destroy(Review $review)
    {
        if (Auth::id() !== $review->client_id) {
            abort(403);
        }

        $review->delete();

        return back()->with('success', 'Avis supprimé.');
    }
}

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
    // 1. Kan-jibu l-reviews dyal l-user li m-connecti daba
    // u kan-jibu m3ahom l-service bach n-3arfu kola review dyal ay khidma
    $reviews = Review::with('service')
        ->where('client_id', Auth::id())
        ->latest() // Bach i-bano l-jdid houma l-lowlin
        ->get();

    // 2. Render-i l-page React (matsaybha f resources/js/Pages/Client/Reviews.jsx)
    return Inertia::render('Client/Reviews', [
        'reviews' => $reviews
    ]);
}
    /**
     * Khazan t-aqyim jdid (Create or Update)
     */
    public function store(Request $request)
    {
        // 1. Validat l-data
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'nullable|string|max:500',
        ]);

        // 2. Khazan n-natiza (updateOrCreate bach l-client may-foutsh review wahed l-kol service)
        $review=Review::updateOrCreate(
            [
                'client_id' => Auth::id(), // ID dyal l-user li m-konikti
                'service_id' => $request->service_id
            ],
            [
                'note' => $request->note,
                'commentaire' => $request->commentaire
            ]
        );
        $service = $review->service;
    $average = $service->reviews()->avg('note'); // k-i-hseb l-moyenne
    $service->update(['moyenne_note' => $average]);

        // 3. Rje' l-lour b message dyal najaḥ
        return back()->with('success', 'Avis bien enregistré !');
    }

    /**
     * Delete review (ila bgha l-client i-mseḥ taqyim dyalu)
     */
    public function destroy(Review $review)
    {
        // T-akd bli ghir mol review li i-qdar i-mshou
        if (Auth::id() !== $review->client_id) {
            abort(403);
        }

        $review->delete();
        return back()->with('success', 'Avis supprimé.');
    }
}
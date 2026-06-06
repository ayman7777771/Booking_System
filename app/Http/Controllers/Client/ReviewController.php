<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * 1. Wadifa: Afficher (عرض) la page des avis du client connected
     */
    public function index()
    {
        // Kan-jibu l-reviews dyal l-user li m-connecti daba m3a l-service dyalhom
        $reviews = Review::with('service')
            ->where('client_id', Auth::id())
            ->latest() // L-jdid hwa l-lowal
            ->get();

        // Render-i l-page React dyalk s-afiya
        return Inertia::render('Client/Reviews', [
            'reviews' => $reviews
        ]);
    }

    /**
     * 2. Wadifa: Enregistrer (خزن) awla modifier un avis + Calculer la moyenne
     */
    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'nullable|string|max:500',
        ]);

        // Enregistrement dyal l-review
        $review = Review::updateOrCreate(
            [
                'client_id' => Auth::id(), 
                'service_id' => $request->service_id
            ],
            [
                'note' => $request->note,
                'commentaire' => $request->commentaire
            ]
        );

        // Hna k-i-hseb l-moyenne d l-khidma u kiy-update-iha direct f table services
        $service = $review->service;
        if ($service) {
            $average = $service->reviews()->avg('note'); 
            $service->update(['moyenne_note' => $average]);
        }

        return back()->with('success', 'Avis bien enregistré !');
    }

    /**
     * 3. Wadifa: Supprimer (مسح) un avis
     */
    public function destroy(Review $review)
    {
        // T-akked blli ghir s7ab l-review li i-qder i-mṣaḥha
        if (Auth::id() !== $review->client_id) {
            abort(403);
        }

        $review->delete();
        
        return back()->with('success', 'Avis supprimé.');
    }
}
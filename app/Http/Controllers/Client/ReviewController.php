<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with('client', 'provider')->get();
        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $review = Review::create($request->validated());
        return response()->json($review, 201);
    }

    public function show(Review $review)
    {
        return response()->json($review->load('client', 'provider'));
    }

    public function update(Request $request, Review $review)
    {
        $review->update($request->validated());
        return response()->json($review);
    }

    public function destroy(Review $review)
    {
        $review->delete();
        return response()->json(['message' => 'Review deleted']);
    }
}

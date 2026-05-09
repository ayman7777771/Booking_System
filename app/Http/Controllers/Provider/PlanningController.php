<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Provider\Planning;
use Illuminate\Http\Request;

class PlanningController extends Controller
{
    public function index()
    {
        $plannings = Planning::with('provider')->get();
        return response()->json($plannings);
    }

    public function store(Request $request)
    {
        $planning = Planning::create($request->validated());
        return response()->json($planning, 201);
    }

    public function show(Planning $planning)
    {
        return response()->json($planning->load('provider'));
    }

    public function update(Request $request, Planning $planning)
    {
        $planning->update($request->validated());
        return response()->json($planning);
    }

    public function destroy(Planning $planning)
    {
        $planning->delete();
        return response()->json(['message' => 'Planning deleted']);
    }

    public function byProvider($providerId)
    {
        $plannings = Planning::where('provider_id', $providerId)->get();
        return response()->json($plannings);
    }
}

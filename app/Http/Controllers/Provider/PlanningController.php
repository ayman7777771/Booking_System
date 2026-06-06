<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Requests\Provider\PlanningRequest;
use App\Models\Provider\Planning;

class PlanningController extends Controller
{
    public function store(PlanningRequest $request)
    {
        // $this->authorize('create', Planning::class);
        $provider = auth()->user()->provider;
        $workingHours = $request->validated('working_hours');

        Planning::where('provider_id', $provider->id)->delete();

        $days = [
            'lun' => 'Lun',
            'mar' => 'Mar',
            'mer' => 'Mer',
            'jeu' => 'Jeu',
            'ven' => 'Ven',
            'sam' => 'Sam',
            'dim' => 'Dim',
        ];

        foreach ($days as $key => $d) {
            if (! empty($workingHours[$key])) {
                Planning::create([
                    'provider_id' => $provider->id,
                    'day' => $d,
                    'time' => $workingHours[$key],
                ]);
            }
        }

        return back()->with('success', 'Planning updated successfully.');
    }

    public function update(PlanningRequest $request, Planning $planning)
    {
        // $this->authorize('update', $planning);
        $provider = auth()->user()->provider;
        Planning::where('provider_id', $provider->id)->delete();
        $days = [
            'lun' => 'Lun',
            'mar' => 'Mar',
            'mer' => 'Mer',
            'jeu' => 'Jeu',
            'ven' => 'Ven',
            'sam' => 'Sam',
            'dim' => 'Dim',
        ];
        foreach ($days as $key => $d) {
            if (! empty($request->working_hours[$key])) {
                Planning::create([
                    'provider_id' => $provider->id,
                    'day' => $d,
                    'time' => $request->working_hours[$key],
                ]);
            }
        }

        return back()->with('success', 'Planning updated successfully.');
    }

    public function destroy(Planning $planning)
    {
        $this->authorize('delete', $planning);
        $planning->delete();

        return back();
    }
}

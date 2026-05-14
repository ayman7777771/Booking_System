<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Requests\Provider\PlanningRequest;
use App\Models\Provider\Planning;
use Illuminate\Http\Request;

class PlanningController extends Controller
{
  public function store(PlanningRequest $request)
{
    $this->authorize('create', Planning::class);
    $provider = auth()->user()->provider;
    Planning::create([
        'provider_id' =>$provider->id,
        'day' => $request->day,
        'time' => $request->time,
    ]);
    return back();
}
public function update(PlanningRequest $request, Planning $planning)
{
    $this->authorize('update', $planning);
    $planning->update($request->validated());
    return back();
}

public function destroy(Planning $planning)
{
    $this->authorize('delete', $planning);
    $planning->delete();
    return back();
}
}

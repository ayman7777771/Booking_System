<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Provider\Photo;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function index()
    {
        $photos = Photo::with('provider')->get();
        return response()->json($photos);
    }

    public function store(Request $request)
    {
        $photo = Photo::create($request->validated());
        return response()->json($photo, 201);
    }

    public function show(Photo $photo)
    {
        return response()->json($photo->load('provider'));
    }

    public function update(Request $request, Photo $photo)
    {
        $photo->update($request->validated());
        return response()->json($photo);
    }

    public function destroy(Photo $photo)
    {
        $photo->delete();
        return response()->json(['message' => 'Photo deleted']);
    }

    public function byProvider($providerId)
    {
        $photos = Photo::where('provider_id', $providerId)->get();
        return response()->json($photos);
    }
}

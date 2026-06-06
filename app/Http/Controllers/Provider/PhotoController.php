<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Provider\Photo;
use App\Models\Provider\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function store(Request $request, Service $service)
    {
        abort_if($service->provider_id !== $request->user()?->provider?->id, 403);

        $request->validate([
            'photos' => ['required', 'array', 'min:1'],
            'photos.*' => ['image', 'max:5120'],
        ]);
        foreach ($request->file('photos') as $image) {
            $path = $image->store('services/photos', 'public');
            Photo::create([
                'service_id' => $service->id,
                'path' => $path,
            ]);
        }

        return back()->with('success', 'Photos uploaded successfully');
    }

    public function destroy(Photo $photo)
    {
        abort_if($photo->service?->provider_id !== request()->user()?->provider?->id, 403);

        Storage::disk('public')->delete($photo->path);
        $photo->delete();

        return back()->with('success', 'Photo deleted successfully.');
    }
}

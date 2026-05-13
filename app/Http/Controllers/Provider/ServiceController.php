<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Provider\Service;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Provider\ServiceRequest;
use Inertia\Inertia;


class ServiceController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {

        
    }

    public function create()
    {

    }

    public function store(ServiceRequest $request)
    {

    }

    public function update(ServiceRequest $request, Service $service)
    {

    }

    public function destroy(Service $service)
    {
        
    }
}
 
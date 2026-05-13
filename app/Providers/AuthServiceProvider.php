<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Provider\Service;
use App\Policies\ServicePolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Service::class => ServicePolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
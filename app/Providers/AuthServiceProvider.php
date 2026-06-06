<?php

namespace App\Providers;

use App\Models\Provider\Planning;
use App\Models\Provider\Provider;
use App\Models\Provider\Service;
use App\Policies\PlanningPolicy;
use App\Policies\ProviderPolicy;
use App\Policies\ServicePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Provider::class => ProviderPolicy::class,
        Planning::class => PlanningPolicy::class,
        Service::class => ServicePolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}

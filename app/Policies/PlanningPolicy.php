<?php

namespace App\Policies;

use App\Models\Provider\Planning;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PlanningPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Planning $planning): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'provider';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Planning $planning): bool
    {
        return $user->role === 'provider' && $user->id === $planning->provider->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Planning $planning): bool
    {
        return $user->role === 'provider' && $user->id === $planning->provider->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Planning $planning): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Planning $planning): bool
    {
        return false;
    }
}

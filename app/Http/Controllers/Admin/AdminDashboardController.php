<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client\Reservation;
use App\Models\Provider\Service;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_clients' => User::where('role', 'client')->count(),
                'total_providers' => User::where('role', 'provider')->count(),
                'total_services' => Service::count(),
                'total_bookings' => Reservation::count(),
            ],
        ]);
    }

    public function usersIndex(): Response
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::query()
                ->select(['id', 'name', 'email', 'photoProfile', 'role', 'statut', 'created_at'])
                ->latest()
                ->get(),
        ]);
    }

    public function toggleUserStatus(User $user): RedirectResponse
    {
        if ($user->role === 'admin') {
            return back()->with('error', 'Impossible de modifier le statut d un administrateur.');
        }

        $user->update([
            'statut' => ! $user->statut,
        ]);

        return back()->with('success', 'Statut utilisateur mis a jour.');
    }

    public function destroyUser(User $user): RedirectResponse
    {
        if ($user->role === 'admin') {
            return back()->with('error', 'Action interdite: impossible de supprimer un administrateur.');
        }

        $user->delete();

        return back()->with('success', 'Utilisateur supprime avec succes.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    /**
     * 📊 1. Wajha d l-Dashboard Global (Statistiques)
     */
    public function index()
    {
        // Iḥṣāʾiyāt dynamicment mn l-base de données
        $stats = [
            'total_clients'   => User::where('role', 'client')->count(),
            'total_providers' => User::where('role', 'provider')->count(),
            
            // Éléments supplémentaires (T-qder t-decommentihom mlli t-creeryi les Tables dyalhom)
            'total_services'  => 0, // dynamic: \App\Models\Service::count()
            'total_bookings'  => 0, // dynamic: \App\Models\Booking::count()
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }

    /**
     * 👥 2. Wajha d Gestion des Utilisateurs (Tableau)
     */
    public function usersIndex()
    {
        // Jbna ga3 l-utilisateurs m-stfin mn j-jdid l l-qdim
        $users = User::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * 🗑️ 3. Suppression d l-Utilisateur (حذف الحساب)
     */
    public function destroyUser($id)
    {
        $user = User::findOrFail($id);

        // Sécurité: L-Admin mkiy-qdersch i-supprimer rāsu awla Admin akhor
        if ($user->role === 'admin') {
            return redirect()->back()->with('error', 'Action interdite: Impossible de supprimer un administrateur!');
        }

        // Suppression d l-compte nichan
        $user->delete();

        return redirect()->back()->with('success', 'Utilisateur supprimé avec succès.');
    }
}
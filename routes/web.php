<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Client\ReservationController;
use App\Http\Controllers\Client\ReviewController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Provider\ProviderController;
use App\Http\Controllers\Provider\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Home Page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// 2. Dashboard - يعرض جميع الخدمات والمقدمين (للـ Client)
Route::get('/provider/profile/{provider}', [ProviderController::class, 'profile']);

// 2. Dashboard - يعرض جميع الخدمات للـ Client
Route::get('/dashboard', [ProviderController::class, 'index'])->name('dashboard');

// 3. Routes للـ Auth
Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Client - Reservations & Reviews
    Route::get('/bookings', [ReservationController::class, 'index'])->name('reservations.index');
    Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');

    Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');

    Route::get('/messages/{user?}', [MessageController::class, 'index'])->name('messages.index');
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');
});

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/users', [AdminDashboardController::class, 'usersIndex'])->name('users.index');
        Route::patch('/users/{user}/status', [AdminDashboardController::class, 'toggleUserStatus'])->name('users.status');
        Route::delete('/users/{user}', [AdminDashboardController::class, 'destroyUser'])->name('users.destroy');
    });

// 4. Routes للـ Provider
Route::middleware(['auth'])
    ->prefix('provider')
    ->name('provider.')
    ->group(function () {
        Route::get('/Dashboard', [ProviderController::class, 'dashboard'])->name('dashboard');
        Route::patch('/profile/{provider}', [ProviderController::class, 'update'])->name('profile.update');
        Route::resource('services', ServiceController::class)->only(['index', 'create', 'store', 'update', 'destroy']);
    });

// Route لعرض خدمات مقدم معين
Route::get('/provider/{id}/services', [ServiceController::class, 'byProvider'])->name('services.byProvider');
Route::get('/provider/profile/{provider}', [ProviderController::class, 'profile'])->name('provider.profile');

require __DIR__.'/auth.php';

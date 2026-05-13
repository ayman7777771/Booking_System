<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Provider\ServiceController;
use App\Http\Controllers\Client\ReviewController;
use App\Http\Controllers\Client\ReservationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard kheddam b Inertia
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Routes dyal Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Routes dyal l-Client (Reservations & Reviews)
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
    Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
});

// Routes dyal l-Provider (Hna fin kine l-mouchkil qbel)
Route::middleware(['auth']) // t-qder t-zid 'provider' middleware hna m-ba3d
    ->prefix('provider')
    ->name('provider.')
    ->group(function () {
        Route::resource('services', ServiceController::class)->only(['index', 'create', 'store', 'update', 'destroy']);
    });

// Route bach t-chouf services dyal chi provider k-Client
Route::get('/provider/{id}/services', [ServiceController::class, 'byProvider'])->name('services.byProvider');

require __DIR__.'/auth.php';
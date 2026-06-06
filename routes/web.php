<?php

use App\Http\Controllers\Client\ReservationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Provider\PhotoController;
use App\Http\Controllers\Provider\PlanningController;
use App\Http\Controllers\Provider\ProviderController;
use App\Http\Controllers\Provider\ServiceController;
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
Route::get('/provider/profile/{provider}', [ProviderController::class, 'profile'])->name('provider.profile');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
});

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::middleware(['auth', 'provider'])
    ->prefix('provider')
    ->name('provider.')
    ->group(function () {
        Route::get('/Dashboard', [ProviderController::class, 'dashboard'])->name('dashboard');
        Route::patch('/profile/{provider}', [ProviderController::class, 'update'])->name('profile.update');
        Route::post('/plannings', [PlanningController::class, 'store'])->name('plannings.store');
        Route::post('/services/{service}/photos', [PhotoController::class, 'store'])->name('services.photos.store');
        Route::delete('/photos/{photo}', [PhotoController::class, 'destroy'])->name('photos.destroy');
        Route::patch('/reservations/{reservation}/accept', [ReservationController::class, 'accept'])->name('reservations.accept');
        Route::patch('/reservations/{reservation}/refuse', [ReservationController::class, 'refuse'])->name('reservations.refuse');
        Route::resource('services', ServiceController::class)->only(['create', 'store', 'update', 'destroy']);
    });
require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Client\ReservationController;
use App\Http\Controllers\Client\ReviewController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Provider\PhotoController;
use App\Http\Controllers\Provider\PlanningController;
use App\Http\Controllers\Provider\ProviderController;
use App\Http\Controllers\Provider\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/provider/profile/{provider}', [ProviderController::class, 'profile']);

Route::get('/dashboard', [ProviderController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/mes-demandes', [ReservationController::class, 'index'])->name('reservations.index');
    Route::redirect('/bookings', '/mes-demandes');
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

Route::get('/provider/{id}/services', [ServiceController::class, 'byProvider'])->name('services.byProvider');
Route::get('/provider/profile/{provider}', [ProviderController::class, 'profile'])->name('provider.profile');

require __DIR__.'/auth.php';

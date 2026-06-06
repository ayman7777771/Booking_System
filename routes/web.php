<?php

use App\Http\Controllers\Client\ReservationController;
use App\Http\Controllers\ProfileController;
<<<<<<< HEAD
use App\Http\Controllers\Provider\ServiceController; // Khallinah hna bach l-resource dyal services t-bqa khaddama
use App\Http\Controllers\Client\ReviewController;
use App\Http\Controllers\Client\ReservationController;
=======
use App\Http\Controllers\Provider\PhotoController;
use App\Http\Controllers\Provider\PlanningController;
use App\Http\Controllers\Provider\ProviderController;
use App\Http\Controllers\Provider\ServiceController;
>>>>>>> c751ca930e8ae6edbd4190fab39e797edabd05dc
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Home Page / Welcome
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
<<<<<<< HEAD

// 2. D-Dkhul l-Dynamic mor l-Connexion (Khdemna ghir b ReservationController)
=======
Route::get('/provider/profile/{provider}', [ProviderController::class, 'profile'])->name('provider.profile');
>>>>>>> c751ca930e8ae6edbd4190fab39e797edabd05dc
Route::get('/dashboard', function () {
    $user = auth()->user();

    // ILA KAN USER "PROVIDER" (Prestataire)
    if ($user && $user->provider) {
        // Hna n-qdru n-ṣifto l-Prestateur l-page dyal les réservations li jawh mn 3nd clients
        // (Li ghadi n-gaddouha f l-index dyal ReservationController)
        return app(ReservationController::class)->index(); 
    }

    // ILA KAN USER "CLIENT" 3adi
    // Kiy-mchi nichan l-index dyal ReservationController dyalk (MyReservations)
    return app(ReservationController::class)->index();

})->middleware(['auth', 'verified'])->name('dashboard');


// 3. Group dyal l-Auth (Client u Provider)
Route::middleware('auth')->group(function () {
<<<<<<< HEAD
    // Routes dyal Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Routes dyal l-Client (Reservations & Reviews)
    Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
    
    Route::get('/my-reservations', [ReservationController::class, 'index'])->name('reservations.index');
    Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
});

// 4. Routes dyal l-Provider (Hna khallina l-resource 3adi dyal l-khedma dyalu)
Route::middleware(['auth'])
    ->prefix('provider')
    ->name('provider.')
    ->group(function () {
        // Had l-resource bqat khaddama 100% bach i-qder i-dir create, store, update, destroy d les services
        Route::resource('services', ServiceController::class)->only(['index', 'create', 'store', 'update', 'destroy']);
=======
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
>>>>>>> c751ca930e8ae6edbd4190fab39e797edabd05dc
    });

// Route bach t-chouf services dyal chi provider k-Client
Route::get('/provider/{id}/services', [ServiceController::class, 'byProvider'])->name('services.byProvider');

require __DIR__.'/auth.php';
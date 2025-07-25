<?php

use Inertia\Inertia;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CagarBudayaController;
use App\Http\Controllers\JenisCagarBudayaController;

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);

    return redirect('/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('jenis_cagar_budaya', JenisCagarBudayaController::class);
    Route::resource('cagar_budaya', CagarBudayaController::class);
});

Route::get('/api/provinces', [RegionController::class, 'getProvinces']);
Route::get('/api/cities/{province}', [RegionController::class, 'getCities']);
Route::get('/api/districts/{city}', [RegionController::class, 'getDistricts']);
Route::get('/api/villages/{district}', [RegionController::class, 'getVillages']);

require __DIR__ . '/auth.php';

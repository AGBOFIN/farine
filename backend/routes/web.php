<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SetupController;

Route::get('/', function () {
    return response()->json(['status' => 'online', 'service' => 'Farine API']);
});

// Clear cache route
Route::get('/clear-cache', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('route:clear');
        \Illuminate\Support\Facades\Artisan::call('config:clear');
        \Illuminate\Support\Facades\Artisan::call('cache:clear');
        return response()->json(['status' => 'success', 'message' => 'Cache cleared']);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
});

// Temporary admin route to force database initialization
Route::get('/seed-db', [SetupController::class, 'seedDatabase']);

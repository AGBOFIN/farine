<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SetupController;

Route::get('/', function () {
    return response()->json(['status' => 'online', 'service' => 'Farine API']);
});

// Temporary admin route to force database initialization
Route::get('/seed-db', [SetupController::class, 'seedDatabase']);

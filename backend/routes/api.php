<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->group(function () {
    Route::apiResource('products', ProductController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('contact-messages', ContactMessageController::class);
    Route::apiResource('ingredients', IngredientController::class);
    
    // Auth routes
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    // Temporary route to force database seeding
    Route::get('/force-seed-db-now', function () {
        try {
            // S'assurer que le fichier sqlite existe
            $dbPath = '/var/www/html/database/database.sqlite';
            if (!file_exists($dbPath)) {
                touch($dbPath);
            }
            
            // Forcer SQLite à la volée
            \Illuminate\Support\Facades\Config::set('database.default', 'sqlite');
            \Illuminate\Support\Facades\Config::set('database.connections.sqlite.database', $dbPath);
            
            \Illuminate\Support\Facades\Artisan::call('config:clear');
            \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--force' => true]);
            \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
            
            $ingredients = \App\Models\Ingredient::all();
            $products = \App\Models\Product::all();
            
            return response()->json([
                'status' => 'success',
                'ingredients_count' => count($ingredients),
                'products_count' => count($products),
                'ingredients' => $ingredients,
                'products' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    });
});

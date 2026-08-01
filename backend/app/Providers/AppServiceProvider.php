<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force SQLite connection and ensure database file exists
        config(['database.default' => 'sqlite']);
        
        $dbPath = database_path('database.sqlite');
        if (!file_exists($dbPath)) {
            @touch($dbPath);
        }
    }
}

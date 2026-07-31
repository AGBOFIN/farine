#!/bin/bash

# Set working directory
cd /var/www/html

# Create storage framework directories
mkdir -p storage/framework/cache/data \
         storage/framework/sessions \
         storage/framework/views \
         storage/app/public \
         storage/logs \
         bootstrap/cache

# Create log file if it doesn't exist
touch storage/logs/laravel.log

# Set permissions
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Copy .env.example to .env if .env doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env from .env.example"
fi

# Set LOG_CHANNEL to stderr for Docker environments
sed -i 's/^LOG_CHANNEL=.*/LOG_CHANNEL=stderr/' .env

# Create SQLite database directory and file if they don't exist
mkdir -p database
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
    chmod 664 database/database.sqlite
    echo "Created SQLite database file"
else
    echo "SQLite database file already exists"
fi

# Generate APP_KEY if not set
if ! grep -q "^APP_KEY=base64:" .env; then
    php artisan key:generate --force
    echo "Generated APP_KEY"
fi

# Run database migrations
php artisan migrate --force
echo "Database migrations completed"

# Run database seeders to create admin account
echo "Running database seeders..."
php artisan db:seed --force
echo "Database seeders completed"

# Verify seeder ran successfully
INGREDIENT_COUNT=$(php artisan tinker --execute="echo App\Models\Ingredient::count();" 2>/dev/null || echo "0")
PRODUCT_COUNT=$(php artisan tinker --execute="echo App\Models\Product::count();" 2>/dev/null || echo "0")
echo "Database verification: $INGREDIENT_COUNT ingredients, $PRODUCT_COUNT products"

# Clear configuration, route, and view caches
php artisan config:clear
php artisan route:clear
php artisan view:clear
echo "Caches cleared"

# Start Apache
exec apache2-foreground

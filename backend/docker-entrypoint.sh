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

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cat > .env << 'EOF'
APP_NAME="Farine API"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://farine-backend.onrender.com

LOG_CHANNEL=stderr
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=sqlite
DB_DATABASE=/var/www/html/database/database.sqlite

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
EOF
    echo "Created .env file"
fi

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
echo "Running database migrations..."
php artisan migrate --force || echo "WARNING: Database migrations failed or already run"
echo "Database migrations completed"

# Run database seeders to create admin account and initial data
echo "Running database seeders..."
php artisan db:seed --force || echo "WARNING: Database seeders failed or already run"
echo "Database seeders completed"

# Verify seeder ran successfully
echo "Verifying database seeding..."
INGREDIENT_COUNT=$(php artisan tinker --execute="echo App\Models\Ingredient::count();" 2>/dev/null || echo "0")
PRODUCT_COUNT=$(php artisan tinker --execute="echo App\Models\Product::count();" 2>/dev/null || echo "0")
echo "Database verification: $INGREDIENT_COUNT ingredients, $PRODUCT_COUNT products"

if [ "$INGREDIENT_COUNT" -eq 0 ] || [ "$PRODUCT_COUNT" -eq 0 ]; then
    echo "WARNING: Database seeding may have failed - missing data detected"
fi

# Clear configuration, route, and view caches
php artisan config:clear || echo "WARNING: Failed to clear config cache"
php artisan route:clear || echo "WARNING: Failed to clear route cache"
php artisan view:clear || echo "WARNING: Failed to clear view cache"
echo "Caches cleared"

# Start Apache
exec apache2-foreground

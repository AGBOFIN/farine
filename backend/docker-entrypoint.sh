#!/bin/bash

# Set working directory
cd /var/www/html

# Copy .env.example to .env if .env doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env from .env.example"
fi

# Generate APP_KEY if not set
if ! grep -q "^APP_KEY=base64:" .env; then
    php artisan key:generate --force
    echo "Generated APP_KEY"
fi

# Run database migrations
php artisan migrate --force
echo "Database migrations completed"

# Start Apache
exec apache2-foreground

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ingredient;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ingredient::firstOrCreate(
            ['name' => 'Maïs'],
            [
                'description' => 'Le maïs est la base de notre farine, apportant douceur et énergie. Cultivé dans les régions du Plateau et des Maritime.',
                'benefits' => json_encode(['Riche en glucides', 'Source d\'énergie', 'Digestible']),
                'image_url' => null,
            ]
        );

        Ingredient::firstOrCreate(
            ['name' => 'Sorgho'],
            [
                'description' => 'Le sorgho est une céréale traditionnelle africaine, riche en nutriments et résistante à la sécheresse.',
                'benefits' => json_encode(['Sans gluten', 'Riche en fibres', 'Antioxydants']),
                'image_url' => null,
            ]
        );

        Ingredient::firstOrCreate(
            ['name' => 'Banane plantain'],
            [
                'description' => 'La banane plantain séchée apporte une texture onctueuse et un goût naturellement sucré à notre farine.',
                'benefits' => json_encode(['Potassium', 'Vitamines', 'Fibres']),
                'image_url' => null,
            ]
        );

        Ingredient::firstOrCreate(
            ['name' => 'Soja'],
            [
                'description' => 'Le soja enrichit notre farine en protéines végétales de haute qualité.',
                'benefits' => json_encode(['Protéines végétales', 'Acides aminés essentiels', 'Isoflavones']),
                'image_url' => null,
            ]
        );

        Ingredient::firstOrCreate(
            ['name' => 'Mil'],
            [
                'description' => 'Le mil est une céréale ancienne, très nutritive et adaptée aux climats chauds.',
                'benefits' => json_encode(['Fer', 'Magnésium', 'Vitamines B']),
                'image_url' => null,
            ]
        );
    }
}

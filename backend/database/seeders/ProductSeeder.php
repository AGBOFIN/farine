<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Farine Instantanée De La Capitale',
            'description' => 'Notre farine instantanée est un mélange équilibré de céréales locales soigneusement sélectionnées. Prête en quelques minutes, elle offre une nutrition complète pour toute la famille. Sans conservateurs, sans additifs, 100% naturel.',
            'price' => 2500,
            'weight' => '1kg',
            'image_url' => null,
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'Farine Instantanée - Petit Format',
            'description' => 'Format idéal pour les petites familles ou pour tester notre produit.',
            'price' => 1500,
            'weight' => '500g',
            'image_url' => null,
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'Farine Instantanée - Grand Format',
            'description' => 'Format économique pour les grandes familles.',
            'price' => 4500,
            'weight' => '2kg',
            'image_url' => null,
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'Farine Instantanée - Format Professionnel',
            'description' => 'Format professionnel pour les restaurants et commerces.',
            'price' => 10000,
            'weight' => '5kg',
            'image_url' => null,
            'is_active' => true,
        ]);
    }
}

<?php

namespace Database\Factories;

use App\Models\Categorie;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategorieFactory extends Factory
{
    protected $model = Categorie::class;

    public function definition(): array
    {
        $categories = [
            'Plomberie',
            'Électricité',
            'Menuiserie',
            'Peinture',
            'Nettoyage',
            'Maintenance',
            'Réparation',
            'Installation',
            'Design',
            'Consultation',
            'Soudure',
            'Décoration',
            'Construction',
            'Terrassement',
            'Déménagement',
            'Livraison',
        ];

        return [
            'name' => fake()->randomElement($categories),
        ];
    }
}
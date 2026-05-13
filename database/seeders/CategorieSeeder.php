<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'Coiffure & Esthétique'],
            ['name' => 'Barbier & Coupe Homme'],
            ['name' => 'Massage & Relaxation'],
            ['name' => 'Soins du Visage & Corps'],
            
            ['name' => 'Réparation PC & Tablettes'],
            ['name' => 'Développement Web & Mobile'],
            ['name' => 'Installation Caméras & Alarme'],
            ['name' => 'Design Graphique & Logo'],
            
            ['name' => 'Plomberie & Chauffage'],
            ['name' => 'Électricité Générale'],
            ['name' => 'Peinture & Décoration'],
            ['name' => 'Nettoyage & Ménage'],
            ['name' => 'Jardinage & Piscine'],
            
            ['name' => 'Photographe & Vidéaste'],
            ['name' => 'Traiteur & Pâtisserie'],
            ['name' => 'DJ & Animation de Fêtes'],
            ['name' => 'Location de Matériel'],
            
            ['name' => 'Soutien Scolaire & Langues'],
            ['name' => 'Coaching Sportif & Fitness'],
            ['name' => 'Comptabilité & Gestion'],
            ['name' => 'Traduction de Documents'],
            
            ['name' => 'Déménagement & Logistique'],
            ['name' => 'Location de Voitures'],
            ['name' => 'Mécanique & Diagnostic Auto']
        ];

        foreach ($categories as $category) {
            Categorie::create($category);
        }
    }
}
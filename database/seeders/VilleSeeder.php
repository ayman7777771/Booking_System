<?php

namespace Database\Seeders;
use App\Models\Ville;

class VilleSeeder extends \Illuminate\Database\Seeder
{
    public function run(): void
    {
        $villes = [
    "Agadir",
    "Al Hoceima",
    "Assilah",
    "Azemmour",
    "Azilal",
    "Beni Mellal",
    "Berkane",
    "Berrechid",
    "Casablanca",
    "Chefchaouen",
    "Dakhla",
    "El Jadida",
    "Errachidia",
    "Essaouira",
    "Fes",
    "Fkih Ben Salah",
    "Guelmim",
    "Ifrane",
    "Kenitra",
    "Khemisset",
    "Khouribga",
    "Laayoune",
    "Larache",
    "Marrakech",
    "Meknes",
    "Mohammedia",
    "Nador",
    "Ouarzazate",
    "Oued Zem",
    "Oujda",
    "Rabat",
    "Safi",
    "Sale",
    "Settat",
    "Sidi Kacem",
    "Sidi Slimane",
    "Skhirat",
    "Tan-Tan",
    "Tanger",
    "Taounate",
    "Taroudant",
    "Taza",
    "Tetouan",
    "Tiznit",
    "Zagora"
];

        foreach ($villes as $ville) {
            Ville::create(['name' => $ville]);
        }
    }
}
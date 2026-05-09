<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $categorie = Categorie::create($request->validated());
        return response()->json($categorie, 201);
    }

    public function show(Categorie $categorie)
    {
        return response()->json($categorie);
    }

    public function update(Request $request, Categorie $categorie)
    {
        $categorie->update($request->validated());
        return response()->json($categorie);
    }

    public function destroy(Categorie $categorie)
    {
        $categorie->delete();
        return response()->json(['message' => 'Categorie deleted']);
    }
}

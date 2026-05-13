<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategorieController extends Controller
{
    public function index()
    {
        // $categories = Categorie::all();
        // dd($categories);
        // return Inertia::render('Auth/Register',compact('categories'));
    }
}

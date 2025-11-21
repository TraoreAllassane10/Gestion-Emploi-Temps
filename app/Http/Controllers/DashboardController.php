<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cours;
use App\Models\Salle;
use App\Models\Filiere;
use App\Models\Seance;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() 
    {
        return Inertia::render("dashboard", [
            "seances" => Seance::latest()->limit(15)->get(),
            "nombreCours" => Cours::count(),
            "nombreFiliere" => Filiere::count(),
            "nombreSalle" => Salle::count()
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cours;
use App\Models\Salle;
use App\Models\Filiere;
use App\Models\Seance;
use Carbon\Carbon;
use Illuminate\Http\Request;

use function Symfony\Component\Clock\now;

class DashboardController extends Controller
{
    public function index()
    {
        // Heure actuelle
        $heureActuelle = date("H:i");

        $sallesNonOccupees = Salle::sallesNonOccupeeActuellement($heureActuelle);

        return Inertia::render("dashboard", [
            "seances" => Seance::latest()->limit(5)->get(),
            "nombreCours" => Cours::count(),
            "nombreFiliere" => Filiere::count(),
            "nombreSalle" => Salle::count(),
            "sallesNonOccupees" => $sallesNonOccupees
        ]);
    }
}

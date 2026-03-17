<?php

namespace App\Http\Controllers;

use App\Models\AnneeUniversitaire;
use App\Models\Etudiant;
use App\Models\Filiere;
use App\Models\Inscription;
use App\Models\Paiement;
use App\Models\Professeur;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $anneeActive = AnneeUniversitaire::where("estActive", 1)->first();

        // Statitstiques globals
        $totalEtudiants = Etudiant::count();
        $totalInscriptions = Inscription::count();
        $totalEnseignants = Professeur::count();
        $totalFilieres = Filiere::count();

        // Statistiques financiers
        $totalAttendu = Inscription::where("annee_universitaire_id", $anneeActive->id)->sum("montant_total");
        $totalPaye = Paiement::whereHas("inscription", function ($query) use ($anneeActive) {
            return $query->where("annee_universitaire_id", $anneeActive->id);
        })->sum("montant");
        $resteAPayer = $totalAttendu - $totalPaye;
        $tauxRecouvrement = $totalAttendu > 0 ? ceil(($totalPaye / $totalAttendu) * 100) : 0;

        // derniers paiements et inscriptions
        $derniers_paiements = Paiement::with([
            "inscription",
            "inscription.etudiant",
            "inscription.niveaux"
        ])->latest()->limit(5)->get();

        $dernieres_inscriptions = Inscription::with([
            "etudiant",
            "niveaux"
        ])->latest()->limit(5)->get();

        return Inertia::render(
            "dashboard",
            [
                "stats_globales" => [
                    "totalEtudiants" => $totalEtudiants,
                    "totalInscriptions" => $totalInscriptions,
                    "totalEnseignants" => $totalEnseignants,
                    "totalFilieres" => $totalFilieres
                ],
                "stats_financiere" => [
                    "totalAttendu" => $totalAttendu,
                    "totalPaye" => $totalPaye,
                    "resteAPayer" => $resteAPayer,
                    "tauxRecouvrement" => $tauxRecouvrement
                ],
                "derniers_paiements" => $derniers_paiements,
                "dernieres_inscriptions" => $dernieres_inscriptions,
            ]
        );
    }
}

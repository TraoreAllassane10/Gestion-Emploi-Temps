<?php

namespace App\Http\Controllers;

use App\Http\Requests\etudiant\CreateEtudiantRequest;
use App\Http\Requests\etudiant\UpdateEtudiantRequest;
use Exception;
use Inertia\Inertia;
use App\Models\Etudiant;
use App\Http\Resources\EtudiantRessource;
use App\Models\AnneeScolaire;
use App\Models\Niveau;

class EtudiantController extends Controller
{
    public function index()
    {
        try {
            $derniereAnnee = AnneeScolaire::latest()->first();

            $etudiants = EtudiantRessource::collection(Etudiant::with(["niveaux" => function ($query) use ($derniereAnnee) {
                $query->wherePivot("annee_scolaire_id", $derniereAnnee->id);
            }])->latest()->paginate(10));
            return Inertia::render("etudiant/Index", [
                "etudiants" => $etudiants
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function create()
    {
        $niveaux = Niveau::select(["id", "nom"])->get();
        $annees = AnneeScolaire::select(["id", "libelle"])->get();
        return Inertia::render("etudiant/Create", [
            "annees" => $annees,
            "niveaux" => $niveaux
        ]);
    }

    public function store(CreateEtudiantRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un etudiant
            $etudiants = Etudiant::create([
                "ip" => $data['ip'],
                "nom" => $data['nom'],
                "prenom" => $data['prenom'],
                "date_naissance" => $data['date_naissance'],
                "lieu_naissance" => $data['lieu_naissance'],
                "numero" => $data['numero'],
                "nom_parent" => $data['nom_parent'],
                "numero_parent" =>  $data['numero_parent'],
            ]);

            if ($etudiants) {
                $etudiants->niveaux()->attach($data["niveau_id"], [
                    "annee_scolaire_id" => $data["annee_id"]
                ]);
            }

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Etudiant $etudiant)
    {
        $niveaux = Niveau::select(["id", "nom"])->get();
        $annees = AnneeScolaire::select(["id", "libelle"])->get();

        return Inertia::render("etudiant/Edit", [
            "etudiant" => $etudiant->load('niveaux'),
            "annees" => $annees,
            "niveaux" => $niveaux
        ]);
    }

    public function update(UpdateEtudiantRequest $request, string $etudiant)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $etudiant = Etudiant::find($etudiant);

            $etudiantUpdated = $etudiant->update([
                "ip" => $data['ip'],
                "nom" => $data['nom'],
                "prenom" => $data['prenom'],
                "date_naissance" => $data['date_naissance'],
                "lieu_naissance" => $data['lieu_naissance'],
                "numero" => $data['numero'],
                "nom_parent" => $data['nom_parent'],
                "numero_parent" =>  $data['numero_parent'],
            ]);

            if ($etudiantUpdated) {
                $etudiant->niveaux()->syncWithPivotValues(
                    $data["niveau_id"],
                    [
                        "annee_scolaire_id" => $data["annee_id"]
                    ]
                );
            }

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Etudiant $etudiant)
    {
        try {
            //Suppression d'une filiere
            $etudiant->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

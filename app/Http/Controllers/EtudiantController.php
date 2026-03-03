<?php

namespace App\Http\Controllers;

use App\Enums\StatutEtudiant;
use App\Http\Requests\etudiant\CreateEtudiantRequest;
use App\Http\Requests\etudiant\UpdateEtudiantRequest;
use Exception;
use Inertia\Inertia;
use App\Models\Etudiant;
use App\Http\Resources\EtudiantRessource;

class EtudiantController extends Controller
{
    public function index()
    {
        try {
            $etudiants = EtudiantRessource::collection(Etudiant::latest()->paginate(10));

            $total = Etudiant::count();
            $affecte = Etudiant::where("statut", StatutEtudiant::AFFECTE->value)->count();
            $naff = Etudiant::where("statut", StatutEtudiant::NAFF->value)->count();
            $reaffecte = Etudiant::where("statut", StatutEtudiant::REAFFECTE->value)->count();
            $transfert = Etudiant::where("statut", StatutEtudiant::TRANSFERT->value)->count();

            return Inertia::render("etudiant/Index", [
                "etudiants" => $etudiants,
                "stats" => [
                    "total" => $total,
                    "affecte" => $affecte,
                    "naff" => $naff,
                    "reaffecte" => $reaffecte,
                    "transfert" => $transfert
                ]
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function show(Etudiant $etudiant)
    {
        return Inertia::render("etudiant/Show", [
            "etudiant" => $etudiant
        ]);
    }

    public function create()
    {
        return Inertia::render("etudiant/Create");
    }

    public function store(CreateEtudiantRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un etudiant
            $etudiants = Etudiant::create([
                "ip" => $data['ip'],
                "civilite" => $data['civilite'],
                "genre" => $data['genre'],
                "nom" => $data['nom'],
                "prenom" => $data['prenom'],
                "date_naissance" => $data['date_naissance'],
                "lieu_naissance" => $data['lieu_naissance'],
                "nationnalite" => $data['nationnalite'],
                "statut" => $data['statut'],

                "email" => $data['email'] ?? null,
                "contacts" => $data['contacts'] ?? null,
                "pays_residence" => $data['pays_residence'] ?? null,
                "etablissement_origine" => $data['etablissement_origine'] ?? null,
                "annee_obtention_bac" => $data['annee_obtention_bac'] ?? null,
                "serie_bac" => $data['serie_bac'] ?? null,
                "numero_table_bac" => $data['numero_table_bac'] ?? null,
                "nature_piece" => $data['nature_piece'] ?? null,
                "numero_piece" => $data['numero_piece'] ?? null,
                "adresse_geographique" => $data['adresse_geographique'] ?? null,
                "matricule_secondaire" => $data['matricule_secondaire'] ?? null,
                "type_responsable" => $data['type_responsable'] ?? null,
                "nom_responsable" => $data['nom_responsable'] ?? null,
                "numero_responsable" => $data['numero_responsable'] ?? null,
                "profession_responsable" => $data['profession_responsable'] ?? null,


            ]);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Etudiant $etudiant)
    {

        return Inertia::render("etudiant/Edit", [
            "etudiant" => $etudiant
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
                "civilite" => $data['civilite'],
                "genre" => $data['genre'],
                "nom" => $data['nom'],
                "prenom" => $data['prenom'],
                "date_naissance" => $data['date_naissance'],
                "lieu_naissance" => $data['lieu_naissance'],
                "nationnalite" => $data['nationnalite'],
                "statut" => $data['statut'],

                "email" => $data['email'] ?? null,
                "contacts" => $data['contacts'] ?? null,
                "pays_residence" => $data['pays_residence'] ?? null,
                "etablissement_origine" => $data['etablissement_origine'] ?? null,
                "annee_obtention_bac" => $data['annee_obtention_bac'] ?? null,
                "serie_bac" => $data['serie_bac'] ?? null,
                "numero_table_bac" => $data['numero_table_bac'] ?? null,
                "nature_piece" => $data['nature_piece'] ?? null,
                "numero_piece" => $data['numero_piece'] ?? null,
                "adresse_geographique" => $data['adresse_geographique'] ?? null,
                "matricule_secondaire" => $data['matricule_secondaire'] ?? null,
                "type_responsable" => $data['type_responsable'] ?? null,
                "nom_responsable" => $data['nom_responsable'] ?? null,
                "numero_responsable" => $data['numero_responsable'] ?? null,
                "profession_responsable" => $data['profession_responsable'] ?? null,
            ]);

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

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

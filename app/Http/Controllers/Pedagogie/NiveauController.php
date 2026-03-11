<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Http\Requests\niveau\CreateNiveauRequest;
use App\Http\Requests\niveau\UpdateNiveauRequest;
use App\Http\Resources\CoursResource;
use App\Http\Resources\FiliereResource;
use App\Http\Resources\NiveauResource;
use App\Http\Resources\ProfesseurResource;
use App\Http\Resources\SalleResource;
use App\Http\Resources\SeanceResource;
use App\Models\AnneeUniversitaire;
use App\Models\Cours;
use App\Models\Etudiant;
use App\Models\Filiere;
use App\Models\Niveau;
use App\Models\Professeur;
use App\Models\Salle;
use App\Models\Seance;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NiveauController extends Controller
{
    public function index()
    {
        try {
            $niveaux = NiveauResource::collection(Niveau::latest()->paginate(10));

            return Inertia::render("niveau/Index", [
                "niveaux" => $niveaux,
                "filieres" => FiliereResource::collection(Filiere::latest()->get())
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateNiveauRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un niveau
            Niveau::create($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Niveau $niveau)
    {
        return Inertia::render("niveau/Edit", [
            "niveau" => $niveau,
            "filieres" => FiliereResource::collection(Filiere::latest()->get())
        ]);
    }

    public function update(UpdateNiveauRequest $request, Niveau $niveau)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $niveau->update($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Niveau $niveau)
    {
        try {
            //Suppression d'une filiere
            $niveau->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function emploiParNiveau(Request $request, string $niveauId)
    {
        try {
            $salle = $request->query("salle");
            $professeur = $request->query("professeur");
            $date = $request->query("date");

            // Filtrage dynamique des séances
            $seances = Seance::where("niveau_id", $niveauId)
                ->when($salle, function ($query) use ($salle) {
                    $query->where("salle_id", $salle);
                })
                ->when($professeur, function ($query) use ($professeur) {
                    $query->where("professeur_id", $professeur);
                })
                ->when($date, function ($query) use ($date) {
                    $query->where("date", $date);
                })
                ->orderByDesc('date')
                ->paginate(10);

            return Inertia::render("niveau/EmploiDuTemps", [
                "seances" => SeanceResource::collection($seances),
                "professeurs" => ProfesseurResource::collection(Professeur::latest()->get()),
                "cours" => CoursResource::collection(Cours::latest()->get()),
                "salles" => SalleResource::collection(Salle::latest()->get()),
                "niveaux" => NiveauResource::collection(Niveau::latest()->get()),
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function listeDeClasse(string $niveauId)
    {
        // Annee universitaire active
        $anneeActive = AnneeUniversitaire::where("estActive", 1)->first();

        $niveau = Niveau::find($niveauId);

        $listeDesEtudiants = Etudiant::whereHas("inscriptions", function ($query) use ($niveauId, $anneeActive) {
            return $query->where("annee_universitaire_id", $anneeActive->id)->whereHas("niveaux", function ($query) use ($niveauId) {
                return $query->whereIn("niveau_id", [$niveauId]);
            });
        })->get();

        return Inertia::render('niveau/ListeDeClasse', [
            "liste" => $listeDesEtudiants,
            "niveau" => $niveau
        ]);
    }
}

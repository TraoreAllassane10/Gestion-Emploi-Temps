<?php

namespace App\Http\Controllers;

use App\Http\Requests\seance\CreateSeanceRequest;
use App\Http\Requests\seance\UpdateSeanceRequest;
use Carbon\Carbon;
use Exception;
use Inertia\Inertia;
use App\Models\Cours;
use App\Models\Salle;
use App\Models\Niveau;
use App\Models\Seance;
use App\Models\Professeur;
use App\Http\Resources\CoursResource;
use App\Http\Resources\SalleResource;
use App\Http\Resources\NiveauResource;
use App\Http\Resources\SeanceResource;
use App\Http\Resources\ProfesseurResource;
use App\Models\AnneeScolaire;
use Illuminate\Http\Request;

class SeanceController extends Controller
{
    public function index(Request $request)
    {
        $salle = $request->query("salle");
        $niveau = $request->query("niveau");
        $professeur = $request->query("professeur");

        try {
            if ($salle) {
                $seances = SeanceResource::collection(Seance::where("salle_id", $salle)->paginate(10));
            } elseif ($niveau) {
                $seances = SeanceResource::collection(Seance::where("niveau_id", $niveau)->paginate(10));
            } elseif ($professeur) {
                $seances = SeanceResource::collection(Seance::where("professeur_id", $professeur)->paginate(10));
            } else {
                $seances = SeanceResource::collection(Seance::latest()->paginate(10));
            }


            return Inertia::render("seance/Index", [
                "seances" => $seances,
                "professeurs" => ProfesseurResource::collection(Professeur::latest()->get()),
                "cours" => CoursResource::collection(Cours::latest()->get()),
                "salles" => SalleResource::collection(Salle::latest()->get()),
                "niveaux" => NiveauResource::collection(Niveau::latest()->get()),
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateSeanceRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            // Recupere la derniere année enregistrée et l'envoyer dans les données à stocker
            $data["annee_scolaire_id"] = AnneeScolaire::latest("created_at")->first()->id;

            //Creation d'une séance
            Seance::create($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Seance $seance)
    {
        return Inertia::render("seance/Edit", [
            "seance" => $seance,
            "professeurs" => ProfesseurResource::collection(Professeur::latest()->get()),
            "cours" => CoursResource::collection(Cours::latest()->get()),
            "salles" => SalleResource::collection(Salle::latest()->get()),
            "niveaux" => NiveauResource::collection(Niveau::latest()->get()),
        ]);
    }

    public function update(UpdateSeanceRequest $request, Seance $seance)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $seance->update($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Seance $seance)
    {
        try {
            //Suppression d'une seance
            $seance->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

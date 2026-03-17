<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Http\Requests\semaine\CreateSemaineRequest;
use App\Http\Requests\semaine\UpdateSemaineRequest;
use App\Models\AnneeUniversitaire;
use App\Models\Semaine;
use Carbon\Carbon;
use Exception;
use Inertia\Inertia;

class SemaineController extends Controller
{
    public function index()
    {
        try {
            $anneeActive = AnneeUniversitaire::where("estActive", 1)->first();

            $semaines = Semaine::where("annee_universitaire_id", $anneeActive->id)->get();

            return Inertia::render("semaine/Index", [
                "semaines" => $semaines,
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateSemaineRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();
            $anneeActive = AnneeUniversitaire::where("estActive", 1)->first();

            $semaineExiste = Semaine::where("annee_universitaire_id", $anneeActive->id)
                ->where("date_debut", Carbon::parse($data['date_debut']))
                ->where("date_fin", Carbon::parse($data['date_fin']))
                ->exists();

            if ($semaineExiste) {
                return response()->json([
                    "success" => false,
                    "message" => "La semaine que vous tentez de creer existe déjà !"
                ]);
            }

            //Creation d'un horaire
            Semaine::create([
                "libelle" => $data['libelle'],
                "date_debut" => Carbon::parse($data['date_debut']),
                "date_fin" => Carbon::parse($data['date_fin']),
                "annee_universitaire_id" => $anneeActive->id
            ]);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Semaine $semaine)
    {
        return Inertia::render("semaine/Edit", [
            "semaine" => $semaine,
        ]);
    }

    public function update(UpdateSemaineRequest $request, Semaine $semaine)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $semaine->update([
                "libelle" => $data['libelle'],
                "date_debut" => Carbon::parse($data['date_debut']),
                "date_fin" => Carbon::parse($data['date_fin']),
            ]);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Semaine $semaine)
    {
        try {
            //Suppression d'un horaire
            $semaine->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

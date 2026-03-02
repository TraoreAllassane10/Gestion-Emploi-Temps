<?php

namespace App\Http\Controllers\Administrateur;

use App\Http\Controllers\Controller;
use App\Http\Requests\Annee\CreateAnneeScolaireRequest;
use App\Http\Requests\Annee\UpdateAnneeScolaireRequest;
use App\Http\Resources\AnneeScolaireResource;
use App\Models\AnneeUniversitaire;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnneeAcademiqueController extends Controller
{
    public function index()
    {
        try {
            $annees = AnneeScolaireResource::collection(AnneeUniversitaire::orderByDesc("date_fin")->paginate(10));

            return Inertia::render("annee/Index", [
                "annees" => $annees
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateAnneeScolaireRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'une année scolaire
            AnneeUniversitaire::create([
                "libelle" => $data["libelle"],
                "date_debut" => Carbon::parse($data["date_debut"])->format('Y-m-d'),
                "date_fin" => Carbon::parse($data["date_fin"])->format('Y-m-d'),
            ]);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(AnneeUniversitaire $annee)
    {
        return Inertia::render("annee/Edit", [
            // Pouvoir recuperer les dates sous format 'Y-m-d' pour mes inputs coté frontend
            "annee" => [
                "id" => $annee->id,
                "libelle" => $annee->libelle,
                "date_debut" => Carbon::parse($annee->date_debut)->format('Y-m-d'),
                "date_fin" => Carbon::parse($annee->date_fin)->format('Y-m-d'),
            ]
        ]);
    }

    public function update(UpdateAnneeScolaireRequest $request, AnneeUniversitaire $annee)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $annee->update([
                "libelle" => $data["libelle"],
                "date_debut" => Carbon::parse($data["date_debut"])->format('Y-m-d'),
                "date_fin" => Carbon::parse($data["date_fin"])->format('Y-m-d'),
            ]);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(AnneeUniversitaire $annee)
    {
        try {
            //Suppression d'une année scolaire
            $annee->delete();

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function editAnneeActive(AnneeUniversitaire $annee)
    {
        try {
            $anneeActive = AnneeUniversitaire::where("estActive", 1)->first();
            $touteLesAnnees = AnneeUniversitaire::orderByDesc("date_fin")->get();

            return Inertia::render("annee/AnneeAcademiqueActive", [
                "anneeActive" => $anneeActive,
                "annees" => $touteLesAnnees
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function changeAnneeActive(string $id)
    {
        try {
            DB::transaction(function () use ($id) {
                // Desactive l'annee actuelle active
                $anneeActuellementActive = AnneeUniversitaire::where("estActive", 1)->first();
                $anneeActuellementActive->estActive = 0;
                $anneeActuellementActive->save();

                $annee = AnneeUniversitaire::find($id);
                $annee->estActive = 1;
                $annee->save();
            });

            return response()->json([
                "success" => true,
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

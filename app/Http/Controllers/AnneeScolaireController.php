<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\AnneeScolaire;
use App\Http\Resources\AnneeScolaireResource;
use App\Http\Requests\Annee\CreateAnneeScolaireRequest;
use App\Http\Requests\Annee\UpdateAnneeScolaireRequest;
use Carbon\Carbon;

class AnneeScolaireController extends Controller
{
    public function index()
    {
        try {
            $annees = AnneeScolaireResource::collection(AnneeScolaire::latest()->paginate(10));
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
            AnneeScolaire::create([
                "libelle" => $data["libelle"],
                "date_debut" => Carbon::parse($data["date_debut"])->format('d-m-Y'),
                "date_fin" => Carbon::parse($data["date_fin"])->format('d-m-Y'),
            ]);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(AnneeScolaire $annee)
    {
        return Inertia::render("annee/Edit", [
            // Pouvoir recuperer les dates sous format 'Y-m-d' pour mes inputs coté frontend
            "annee" => [
                "id" => $annee->id,
                "libelle" => $annee->libelle,
                "date_debut" => Carbon::parse($annee->date_debut)->format('Y-m-d'), 
                "date_fin" => Carbon::parse($annee->date_fin)->format('Y-m-d'),
        ]]);
    }

    public function update(UpdateAnneeScolaireRequest $request, AnneeScolaire $annee)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $annee->update($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(AnneeScolaire $annee)
    {
        try {
            //Suppression d'une année scolaire
            $annee->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

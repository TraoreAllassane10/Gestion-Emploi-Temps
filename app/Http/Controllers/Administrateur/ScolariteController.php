<?php

namespace App\Http\Controllers\Administrateur;

use App\Enums\ScolariteType;
use App\Http\Controllers\Controller;
use App\Http\Requests\scolarite\CreateScolariteRequest;
use App\Http\Requests\scolarite\UpdateScolariteRequest;
use App\Models\AnneeUniversitaire;
use App\Models\Niveau;
use App\Models\Scolarite;
use Exception;
use Inertia\Inertia;

class ScolariteController extends Controller
{
    public function index()
    {
        try {
            $niveaux = Niveau::latest()->get();
            $annee = AnneeUniversitaire::where("estActive", 1)->first();

            $scolarites = Scolarite::where("annee_universitaire_id", $annee->id)
                ->latest()
                ->get();

            return Inertia::render("scolarite/Index", [
                "scolarites" => $scolarites,
                "niveaux" => $niveaux,
                "annee" => $annee,
                "types" => ScolariteType::cases()
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateScolariteRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $scolariteExiste = Scolarite::where("niveau_id", $data['niveau_id'])
                ->where("type", $data['type'])
                ->exists();

            if ($scolariteExiste) {
                return response()->json([
                    "success" => false,
                    "message" => "Le niveau selectionné à déjà une scolarité pour ce type"
                ]);
            }

            //Creation d'une scolarite
            Scolarite::create([
                "annee_universitaire_id" => $data['annee_id'],
                "niveau_id" => $data['niveau_id'],
                "type" => $data['type'],
                "montant" => $data['montant'],
            ]);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Scolarite $scolarite)
    {
        $niveaux = Niveau::latest()->get();

        return Inertia::render("scolarite/Edit", [
            "scolarite" => $scolarite,
            "niveaux" => $niveaux,
            "types" => ScolariteType::cases()
        ]);
    }

    public function update(UpdateScolariteRequest $request, Scolarite $scolarite)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $scolarite->update([
                "annee_universitaire_id" => $data['annee_id'],
                "niveau_id" => $data['niveau_id'],
                "type" => $data['type'],
                "montant" => $data['montant'],
            ]);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Scolarite $scolarite)
    {
        try {
            //Suppression d'une scolarite
            $scolarite->delete();

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

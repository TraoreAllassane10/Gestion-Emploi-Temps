<?php

namespace App\Http\Controllers;

use App\Http\Requests\professeur\CreateProfesseurRequest;
use App\Http\Requests\professeur\UpdateProfesseurRequest;
use Exception;
use Inertia\Inertia;
use App\Models\Professeur;
use App\Http\Resources\ProfesseurResource;

class ProfesseurController extends Controller
{
    public function index()
    {
        try {
            $professeurs = ProfesseurResource::collection(Professeur::latest()->paginate(10));
            return Inertia::render("professeur/Index", [
                "professeurs" => $professeurs,
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateProfesseurRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un professeur
            Professeur::create($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Professeur $professeur)
    {
        return Inertia::render("professeur/Edit", [
            "professeur" => $professeur,
        ]);
    }

    public function update(UpdateProfesseurRequest $request, Professeur $professeur)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $professeur->update($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Professeur $professeur)
    {
        try {
            //Suppression d'un professeur
            $professeur->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    } 
}

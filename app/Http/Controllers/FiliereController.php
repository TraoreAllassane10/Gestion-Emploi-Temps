<?php

namespace App\Http\Controllers;

use App\Http\Requests\filiere\CreateFiliereRequest;
use App\Http\Requests\filiere\UpdateFiliereRequest;
use Exception;
use Inertia\Inertia;
use App\Models\Filiere;
use App\Http\Resources\FiliereResource;

class FiliereController extends Controller
{
    public function index()
    {
        try {
            $filieres = FiliereResource::collection(Filiere::latest()->paginate(10));
            return Inertia::render("filiere/Index", [
                "filieres" => $filieres
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateFiliereRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'une filiere
            Filiere::create($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Filiere $filiere)
    {
        return Inertia::render("filiere/Edit", [
            "filiere" => $filiere
        ]);
    }

    public function update(UpdateFiliereRequest $request, Filiere $filiere)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $filiere->update($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Filiere $filiere)
    {
        try {
            //Suppression d'une filiere
            $filiere->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

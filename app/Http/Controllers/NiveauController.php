<?php

namespace App\Http\Controllers;

use App\Http\Requests\niveau\CreateNiveauRequest;
use App\Http\Requests\niveau\UpdateNiveauRequest;
use App\Http\Resources\FiliereResource;
use Exception;
use Inertia\Inertia;
use App\Models\Niveau;
use App\Http\Resources\NiveauResource;
use App\Models\Filiere;

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
}

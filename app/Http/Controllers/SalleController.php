<?php

namespace App\Http\Controllers;

use App\Http\Requests\salle\CreateSalleRequest;
use App\Http\Requests\salle\UpdateSalleRequest;
use Exception;
use Inertia\Inertia;
use App\Models\Salle;
use App\Http\Resources\SalleResource;

class SalleController extends Controller
{
     public function index()
    {
        try {
            $salles = SalleResource::collection(Salle::latest()->paginate(10));
            return Inertia::render("salle/Index", [
                "salles" => $salles
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateSalleRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'une salle
            Salle::create($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Salle $salle)
    {
        return Inertia::render("salle/Edit", [
            "salle" => $salle
        ]);
    }

    public function update(UpdateSalleRequest $request, Salle $salle)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $salle->update($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Salle $salle)
    {
        try {
            //Suppression d'une salle
            $salle->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Http\Requests\filiere\CreateFiliereRequest;
use App\Http\Requests\filiere\UpdateFiliereRequest;
use App\Http\Resources\FiliereResource;
use App\Models\Filiere;
use App\Services\FiliereService;
use Exception;
use Inertia\Inertia;

class FiliereController extends Controller
{
    public function __construct(
        protected FiliereService $filiereService
    ) {}

    public function index()
    {
        try {
            $filieres = FiliereResource::collection($this->filiereService->getAllFilieres());
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
            $filliereCreee = $this->filiereService->createFiliere($data);

            if ($filliereCreee) {
                return response()->json(["success" => true]);
            }
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

            $filiereModifiee = $this->filiereService->updateFiliere($filiere, $data);

            if ($filiereModifiee) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Filiere $filiere)
    {
        try {
            //Suppression d'une filiere
            $filiereSupprimee = $this->filiereService->deleteFiliere($filiere);

            if ($filiereSupprimee) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

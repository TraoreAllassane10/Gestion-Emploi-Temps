<?php

namespace App\Http\Controllers;

use App\Http\Requests\professeur\CreateProfesseurRequest;
use App\Http\Requests\professeur\UpdateProfesseurRequest;
use Exception;
use Inertia\Inertia;
use App\Models\Professeur;
use App\Http\Resources\ProfesseurResource;
use App\Services\ProfesseurService;

class ProfesseurController extends Controller
{
    public function __construct(
        protected ProfesseurService $professeurService,
    ) {}

    public function index()
    {
        try {
            $professeurs = ProfesseurResource::collection($this->professeurService->getAllProfesseurs());

            return Inertia::render("professeur/Index", [
                "professeurs" => $professeurs,
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function create() {
        $professeurs = $this->professeurService->getAllProfesseurs();
        return Inertia::render('professeur/Create', ["professeurs" => $professeurs]);
    }

    public function store(CreateProfesseurRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un professeur
            $professeurCree = $this->professeurService->createProfesseur($data);

            if ($professeurCree) {
                return response()->json(["success" => true]);
            }
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

            $professeurModifie = $this->professeurService->updateProfesseur($professeur, $data);

            if ($professeurModifie) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Professeur $professeur)
    {
        try {
            //Suppression d'un professeur
            $professeurSupprime = $this->professeurService->deleteProfesseur($professeur);

            if ($professeurSupprime) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

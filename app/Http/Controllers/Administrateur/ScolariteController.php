<?php

namespace App\Http\Controllers\Administrateur;

use App\Enums\ScolariteType;
use App\Http\Controllers\Controller;
use App\Http\Requests\scolarite\CreateScolariteRequest;
use App\Http\Requests\scolarite\UpdateScolariteRequest;
use App\Models\Niveau;
use App\Models\Scolarite;
use App\Services\AnneeAcademiqueService;
use App\Services\ScolariteService;
use Exception;
use Inertia\Inertia;

class ScolariteController extends Controller
{
    public function __construct(
        protected ScolariteService $scolariteService,
        protected AnneeAcademiqueService $anneeAcademiqueService
    ) {}

    public function index()
    {
        try {
            $niveaux = Niveau::latest()->get();

            $annee = $this->anneeAcademiqueService->getAnneeActive();

            // Recupere les scolarite de l'annee active (Voir repository)
            $scolarites = $this->scolariteService->getAllScolarites();

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
        $data = $request->validated();

        return $this->scolariteService->createScolarite($data);
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

            $scolariteModifiee = $this->scolariteService->updateScolarite($scolarite, $data);

            if ($scolariteModifiee) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Scolarite $scolarite)
    {
        try {
            //Suppression d'une scolarite
            $scolariteSupprimee = $this->scolariteService->deleteScolarite($scolarite);

            if ($scolariteSupprimee) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

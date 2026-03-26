<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Http\Requests\salle\CreateSalleRequest;
use App\Http\Requests\salle\UpdateSalleRequest;
use App\Http\Resources\SalleResource;
use App\Models\Salle;
use App\Services\SalleService;
use App\Services\SiteService;
use Exception;
use Inertia\Inertia;

class SalleController extends Controller
{
    public function __construct(
        protected SalleService $salleService,
        protected SiteService $siteService
    ) {}

    public function index()
    {
        try {
            $sites = $this->siteService->getAllSites();
            $salles = SalleResource::collection($this->salleService->getAllSalles());

            return Inertia::render("salle/Index", [
                "sites" => $sites,
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
            $salleCreee = $this->salleService->createSalle($data);

            if ($salleCreee) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Salle $salle)
    {
        $sites = $this->siteService->getAllSites();

        return Inertia::render("salle/Edit", [
            "sites" => $sites,
            "salle" => $salle
        ]);
    }

    public function update(UpdateSalleRequest $request, Salle $salle)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $salleModifiee = $this->salleService->updateSalle($salle, $data);

            if ($salleModifiee) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Salle $salle)
    {
        try {
            //Suppression d'une salle
            $salleSupprimee = $this->salleService->deleteSalle($salle);

            if ($salleSupprimee) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

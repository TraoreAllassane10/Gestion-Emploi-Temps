<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Http\Requests\site\CreateSiteRequest;
use App\Http\Requests\site\UpdateSiteRequest;
use App\Http\Resources\SiteResource;
use App\Models\Site;
use App\Services\SiteService;
use Exception;
use Inertia\Inertia;

class SiteController extends Controller
{

    public function __construct(
        protected SiteService $siteService
    ) {}

    public function index()
    {
        try {
            $sites = SiteResource::collection($this->siteService->getAllSites());

            return Inertia::render("site/Index", [
                "sites" => $sites
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateSiteRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un site
            $siteCree = $this->siteService->createSite($data);

            if ($siteCree) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Site $site)
    {
        return Inertia::render("site/Edit", [
            "site" => $site
        ]);
    }

    public function update(UpdateSiteRequest $request, Site $site)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $siteModifie = $this->siteService->updateSite($site, $data);

            if ($siteModifie) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Site $site)
    {
        try {
            //Suppression d'un site
            $siteSupprime = $this->siteService->deleteSite($site);

            if ($siteSupprime) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

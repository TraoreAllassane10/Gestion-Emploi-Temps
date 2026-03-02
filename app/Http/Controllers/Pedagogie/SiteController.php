<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Http\Requests\site\CreateSiteRequest;
use App\Http\Requests\site\UpdateSiteRequest;
use App\Http\Resources\SiteResource;
use App\Models\Site;
use Exception;
use Inertia\Inertia;

class SiteController extends Controller
{
    public function index()
    {
        try {
            $sites = SiteResource::collection(Site::latest()->paginate(10));
            
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

            //Creation d'une salle
            Site::create($data);

            return response()->json(["success" => "true"]);
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

            $site->update($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Site $site)
    {
        try {
            //Suppression d'une salle
            $site->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

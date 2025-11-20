<?php

namespace App\Http\Controllers;

use App\Http\Requests\cours\CreateCoursRequest;
use App\Http\Requests\cours\UpdateCoursRequest;
use Exception;
use Inertia\Inertia;
use App\Models\Cours;
use App\Models\Professeur;
use App\Http\Resources\CoursResource;
use App\Http\Resources\ProfesseurResource;

class CoursController extends Controller
{
    public function index()
    {
        try {
            $cours = CoursResource::collection(Cours::latest()->paginate(10));
            return Inertia::render("cours/Index", [
                "cours" => $cours,
                "professeurs" => ProfesseurResource::collection(Professeur::latest()->get())
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateCoursRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un cours
            Cours::create($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Cours $cours)
    {
        return Inertia::render("cours/Edit", [
            "cours" => $cours,
            "professeurs" => ProfesseurResource::collection(Professeur::latest()->get())
        ]);
    }

    public function update(UpdateCoursRequest $request, Cours $cours)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $cours->update($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Cours $cours)
    {
        try {
            //Suppression d'un cours
            $cours->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    } 
}

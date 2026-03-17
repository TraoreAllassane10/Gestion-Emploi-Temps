<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Http\Requests\horaire\CreateHoraireRequest;
use App\Http\Requests\horaire\UpdateHoraireRequest;
use App\Models\Horaire;
use Carbon\Carbon;
use Exception;
use Inertia\Inertia;

class HoraireController extends Controller
{
    public function index()
    {
        try {
            $horaires = Horaire::orderBy("index_order")->get();

            return Inertia::render("horaire/Index", [
                "horaires" => $horaires,
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateHoraireRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $indexExiste = Horaire::where("index_order", $data['index_order'])->exists();

            if ($indexExiste) {
                return response()->json([
                    "success" => false,
                    "message" => "L'index (ordre) chosit est déjà occupé"
                ]);
            }

            //Creation d'un horaire
            Horaire::create([
                "heure_debut" => Carbon::parse($data['heure_debut'])->format('H:i'),
                "heure_fin" => Carbon::parse($data['heure_fin'])->format('H:i'),
                "index_order" => $data['index_order'],
            ]);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Horaire $horaire)
    {
        return Inertia::render("horaire/Edit", [
            "horaire" => $horaire,
        ]);
    }

    public function update(UpdateHoraireRequest $request, Horaire $horaire)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $horaire->update($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Horaire $horaire)
    {
        try {
            //Suppression d'un horaire
            $horaire->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}

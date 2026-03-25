<?php

namespace App\Http\Controllers\Administrateur;

use App\Http\Controllers\Controller;
use App\Http\Requests\inscription\CreateInscriptionRequest;
use App\Models\AnneeUniversitaire;
use App\Models\Etudiant;
use App\Models\Inscription;
use App\Models\Niveau;
use App\Services\AnneeAcademiqueService;
use App\Services\InscriptionService;
use Exception;
use Inertia\Inertia;


class InscriptionController extends Controller
{
    public function __construct(
        protected InscriptionService $inscriptionService,
        protected AnneeAcademiqueService $anneeAcademiqueService 
    ) {}

    public function index()
    {
        $response = $this->inscriptionService->all();

        return Inertia::render('inscription/Index', [
            "niveaux" => $response['niveaux'],
            "annees" => $response['annees'],
            "inscriptions" => $response['inscriptions'],
            "stats" => $response['stats']
        ]);
    }

    public function create()
    {
        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        // Recupere les etudiants qui ne sont pas incrire durant l'annee universitaire active
        $etudiants = Etudiant::whereDoesntHave("inscriptions", function ($query) use ($anneeActive) {
            return $query->where("annee_universitaire_id", $anneeActive->id);
        })->get();

        $niveaux = Niveau::all();

        // La recuperation de l'annee active MAIS en collection
        $annees = AnneeUniversitaire::where("estActive", 1)->get();

        return Inertia::render('inscription/Create', [
            "etudiants" => $etudiants,
            "niveaux" => $niveaux,
            "annees" => $annees
        ]);
    }

    public function store(CreateInscriptionRequest $request)
    {
        $data = $request->validated();

        // Creation d'une inscription
        return $this->inscriptionService->create($data);

    }

    public function show(string $inscription)
    {
        $inscriptionData = $this->inscriptionService->find($inscription);

        return Inertia::render('inscription/Show', [
            "inscription" => $inscriptionData
        ]);
    }

    public function delete(Inscription $inscription)
    {
        try {
            $this->inscriptionService->delete($inscription);

            return response()->json([
                "success" => true,
                "message" => "Inscription supprimée avec succès"
            ]);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Erreur survenue au niveau du serveur"
            ]);
        }
    }
}

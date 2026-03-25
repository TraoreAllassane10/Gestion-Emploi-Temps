<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Http\Requests\niveau\CreateNiveauRequest;
use App\Http\Requests\niveau\UpdateNiveauRequest;
use App\Http\Resources\CoursResource;
use App\Http\Resources\FiliereResource;
use App\Http\Resources\NiveauResource;
use App\Http\Resources\ProfesseurResource;
use App\Http\Resources\SalleResource;
use App\Http\Resources\SeanceResource;
use App\Models\Cours;
use App\Models\Filiere;
use App\Models\Niveau;
use App\Models\Professeur;
use App\Models\Salle;
use App\Models\Seance;
use App\Services\NiveauService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NiveauController extends Controller
{
    public function __construct(
        protected NiveauService $niveauService,
     
    ) {}

    public function index()
    {
        try {
            $niveaux = NiveauResource::collection($this->niveauService->getAllNiveaux());

            return Inertia::render("niveau/Index", [
                "niveaux" => $niveaux,
                "filieres" => FiliereResource::collection(Filiere::latest()->get())
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateNiveauRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un niveau
            $niveauCree = $this->niveauService->createNiveau($data);

            if ($niveauCree) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Niveau $niveau)
    {
        return Inertia::render("niveau/Edit", [
            "niveau" => $niveau,
            "filieres" => FiliereResource::collection(Filiere::latest()->get())
        ]);
    }

    public function update(UpdateNiveauRequest $request, Niveau $niveau)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $niveauModifie = $this->niveauService->updateNiveau($niveau, $data);

            if ($niveauModifie) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Niveau $niveau)
    {
        try {
            //Suppression d'un niveau
            $niveau->delete();

            return response()->json([
                "success" => true,
                "message" => "Niveau supprimé avec succès"
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function emploiParNiveau(Request $request, string $niveauId)
    {
        try {
            $salle = $request->query("salle");
            $professeur = $request->query("professeur");
            $date = $request->query("date");

            $seances = Seance::where("niveau_id", $niveauId)
                ->where("semaine_id", 3)
                ->get();

            return Inertia::render("niveau/EmploiDuTemps", [
                "seances" => SeanceResource::collection($seances),
                "professeurs" => ProfesseurResource::collection(Professeur::latest()->get()),
                "cours" => CoursResource::collection(Cours::latest()->get()),
                "salles" => SalleResource::collection(Salle::latest()->get()),
                "niveaux" => NiveauResource::collection(Niveau::latest()->get()),
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function listeDeClasse(string $niveauId)
    {

        $niveau = $this->niveauService->getNiveau($niveauId);

        $listeDesEtudiants = $this->niveauService->getListeDeClasse($niveauId);

        return Inertia::render('niveau/ListeDeClasse', [
            "liste" => $listeDesEtudiants,
            "niveau" => $niveau
        ]);
    }

    public function downloadListeDeClase(string $niveauId)
    { 
        return $this->niveauService->getListeDeClasseEnPdf($niveauId);
    }
}

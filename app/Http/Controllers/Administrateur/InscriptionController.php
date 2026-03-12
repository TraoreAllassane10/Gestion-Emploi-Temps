<?php

namespace App\Http\Controllers\Administrateur;

use App\Enums\ScolariteType;
use App\Enums\StatutEtudiant;
use App\Enums\StatutInscription;
use App\Http\Controllers\Controller;
use App\Http\Requests\inscription\CreateInscriptionRequest;
use App\Models\AnneeUniversitaire;
use App\Models\Etudiant;
use App\Models\FraisConfiguration;
use App\Models\Inscription;
use App\Models\Niveau;
use App\Models\Paiement;
use App\Models\Scolarite;
use Inertia\Inertia;


class InscriptionController extends Controller
{
    public function index()
    {
        $niveaux = Niveau::all();
        $annees = AnneeUniversitaire::orderByDesc("date_fin")->get();

        // Annee universitaire active
        $anneeActive = AnneeUniversitaire::where("estActive", 1)->first();

        $inscriptions = Inscription::with("paiements")
            ->withSum("paiements as total_paiements", "montant")
            ->latest()
            ->get();

        // Statistiques
        $nombreTotalInscription = Inscription::count();
        $nombreInscriptionAnneeActive = Inscription::where("annee_universitaire_id", $anneeActive->id)->count();
        $recetteAnneeActive = Inscription::where("annee_universitaire_id", $anneeActive->id)->sum("montant_total");
        $totalVerseAnneeActive = Paiement::whereHas("inscription", function ($query) use ($anneeActive) {
            return $query->where("annee_universitaire_id", $anneeActive->id);
        })->sum("montant");

        return Inertia::render('inscription/Index', [
            "niveaux" => $niveaux,
            "annees" => $annees,
            "inscriptions" => $inscriptions,
            "stats" => [
                "total_inscription" => $nombreTotalInscription,
                "total_inscription_annee" => $nombreInscriptionAnneeActive,
                "recette_annee_active" => $recetteAnneeActive,
                "total_verse_annee_active" => $totalVerseAnneeActive
            ]
        ]);
    }

    public function create()
    {
        $anneeActive = AnneeUniversitaire::where("estActive", 1)->first();

        // Recupere les etudiants qui ne sont pas incrire durant l'annee universitaire active
        $etudiants = Etudiant::whereDoesntHave("inscriptions", function ($query) use ($anneeActive) {
            return $query->where("annee_universitaire_id", $anneeActive->id);
        })->get();

        $niveaux = Niveau::all();
        $annees = $anneeActive = AnneeUniversitaire::where("estActive", 1)->get();

        return Inertia::render('inscription/Create', [
            "etudiants" => $etudiants,
            "niveaux" => $niveaux,
            "annees" => $annees
        ]);
    }

    public function store(CreateInscriptionRequest $request)
    {
        $data = $request->validated();

        // Recuperation l'etudiant et l'annee universitaire dans la bd
        $etudiant = Etudiant::where("ip", $data['etudiant_ip'])->first();
        $anneeUniversitaire = AnneeUniversitaire::where("id", $data['annee_id'])->first();

        if ($etudiant && $anneeUniversitaire) {

            // Verifie si l'etudiant est déjè inscrit durant l'annee choisie
            $estInscrit = Inscription::where("etudiant_ip", $etudiant->ip)
                ->where("annee_universitaire_id", $anneeUniversitaire->id)->first();

            if (!empty($estInscrit)) {
                return response()->json([
                    "success" => false,
                    "message" => "Cet etudiant est déjà inscrit pour l'année selectionné"
                ]);
            }

            // Recuperation de la scolarite et des frais annexe
            $frais_annexe = FraisConfiguration::where("type", "frais_annexe")->first();

             if ($frais_annexe) {
                return response()->json([
                    "success" => false,
                    "message" => "Aucun frais annexe trouve."
                ]);
            }

            // Type de scolarite selon le statut de l'etudiant
            $typeScolarite = $etudiant->statut == StatutEtudiant::NAFF->value ? ScolariteType::NAFF->value : ScolariteType::AFFECTE->value;
           
            // Liste des scolarite en foction des niveaux choisit
            $scolarites = Scolarite::whereIn("niveau_id", $data['niveaux'])
                ->where("type", $typeScolarite)
                ->get();


            if ($scolarites->count() !== count($data['niveaux'])) {
                return response()->json([
                    "success" => false,
                    "message" => "Certains niveaux sélectionnés n'ont pas encore de scolarité définie dans la configuration."
                ]);
            }

            // Scolarite total sans frais annexe
            $scolarite = $scolarites->sum("montant");

            // Calcule de la scolarite apres la reduction. NB: j'applique la reduction sur la scolarite et avant d'ajouter les frais annexe
            $montantReduction = $data['taux_reduction'] > 0 ? ($scolarite * $data['taux_reduction']) / 100 : 0;
            $scolariteApresReduction =  $scolarite - $montantReduction;

            // Calucle du montant total avec les frais annexe
            $montantTotalScolarite = $frais_annexe->montant + $scolariteApresReduction;

            // Enregistrement de l'inscription
            $inscription = Inscription::create([
                "date" => now(),
                "status" => StatutInscription::BON,
                "type_inscription" => $data["type_inscription"],
                "taux_reduction" => $data['taux_reduction'] > 0 ? $data['taux_reduction'] : 0,
                "frais_annexe" => $frais_annexe->montant,
                "montant_scolarite" => $scolariteApresReduction,
                "montant_total" => $montantTotalScolarite,
                "etudiant_ip" => $etudiant->ip,
                "annee_universitaire_id" => $anneeUniversitaire->id
            ]);

            if ($inscription) {
                $inscription->niveaux()->attach($data['niveaux']);
            }
        }


        return response()->json([
            "success" => true,
            "inscription" => $inscription
        ]);
    }

    public function show(string $inscription)
    {
        $inscriptionData = Inscription::where("id", $inscription)
            ->with("paiements")
            ->withSum("paiements as total_paiements", "montant")
            ->first();

        // dd($inscriptionData);
        return Inertia::render('inscription/Show', [
            "inscription" => $inscriptionData
        ]);
    }
}

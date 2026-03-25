<?php

namespace App\Repositories;

use App\Enums\StatutInscription;
use App\Models\Inscription;
use App\Models\Paiement;

class InscriptionRepository
{
    public function all()
    {
        return Inscription::with("paiements")
            ->withSum("paiements as total_paiements", "montant")
            ->latest()
            ->get();
    }

    public function find(string $inscription)
    {
        return Inscription::where("id", $inscription)
            ->with("paiements")
            ->withSum("paiements as total_paiements", "montant")
            ->first();
    }


    public function create(array $data, $frais_annexe, $scolariteApresReduction, $montantTotalScolarite, $etudiant, $anneeUniversitaire)
    {
        return Inscription::create([
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
    }

    public function delete(Inscription $inscription)
    {
        return $inscription->delete();
    }

    public function totalInscription()
    {
        return Inscription::count();
    }

    public function totalInscriptionAnneeActive($anneeActiveId)
    {
        return Inscription::where("annee_universitaire_id", $anneeActiveId)->count();
    }

    public function totalRecetteAnneeActive($anneeActiveId)
    {
        return Inscription::where("annee_universitaire_id", $anneeActiveId)->sum("montant_total");
    }

    public function totalEncaisseAnneActive($anneeActiveId)
    {
        return Paiement::whereHas("inscription", function ($query) use ($anneeActiveId) {
            return $query->where("annee_universitaire_id", $anneeActiveId);
        })->sum("montant");
    }
}

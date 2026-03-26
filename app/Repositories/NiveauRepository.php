<?php

namespace App\Repositories;

use App\Models\Etudiant;
use App\Models\Niveau;

class NiveauRepository
{
    public function all()
    {
        return Niveau::latest()->get();
    }

    public function find(string $niveauId) {
        return Niveau::find($niveauId);
    }

    public function create(array $data)
    {
        return Niveau::create($data);
    }

    public function update(Niveau $niveau, array $data)
    {
        return $niveau->update($data);
    }

    public function delete(Niveau $niveau)
    {
        return $niveau->delete();
    }

    public function ListeDeClasse(string $anneeId, string $niveauId)
    {
        return Etudiant::whereHas("inscriptions", function ($query) use ($niveauId, $anneeId) {
            return $query->where("annee_universitaire_id", $anneeId)->whereHas("niveaux", function ($query) use ($niveauId) {
                return $query->whereIn("niveau_id", [$niveauId]);
            });
        })
            ->orderBy("nom")
            ->orderBy("prenom")
            ->get();
    }
}

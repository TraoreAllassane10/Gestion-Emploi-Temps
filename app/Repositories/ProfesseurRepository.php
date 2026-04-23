<?php

namespace App\Repositories;

use App\Models\Professeur;

class ProfesseurRepository
{
    public function __construct(
        protected AnneeAcademiqueRepository $anneeAcademiqueRepository
    ) {}
    public function all()
    {
        return Professeur::latest()->get();
    }

    public function create(array $data)
    {
        // Option 1 : Nouvel enseignant
        // Option 2 : Enseignant existant

        if ($data['option'] === 2) {
            // Recuperation de l'enseignement existant
            $professeur = Professeur::where("matricule", $data["matricule"])
                ->where('nom_prenom', $data['nom_prenom'])
                ->where('date_naissance', $data['date_naissance'])
                ->first();

            $this->informationDeLaFonction($professeur, $data);
        } else {
            // CReation d'un nouvel enseignant
            $professeur = Professeur::create($data);

            $this->informationDeLaFonction($professeur, $data);
        }

        return $professeur;
    }

    public function update(Professeur $professeur, array $data)
    {
        return $professeur->update($data);
    }

    public function delete(Professeur $professeur)
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        return $professeur->anneeAcademiques()->detach($anneeActive->id);
    }

    public function informationDeLaFonction($professeur, array $data)
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        $anneeActive->professeurs()->attach($professeur->id, [
            "diplome" => $data['diplome'],
            "grade" => $data['grade'],
            "statut" => $data['statut'],
            "annee_prise_fonction" => $data['annee_prise_fonction'],
            "formation_continue" => $data['formation_continue'],
            "nombre_heure_cours_prevue" => $data['nombre_heure_cours_prevue'],
            "nombre_heure_cours_realise" => $data['nombre_heure_cours_realise'],
        ]);
    }
}

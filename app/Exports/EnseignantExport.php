<?php

namespace App\Exports;

use App\Models\Professeur;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EnseignantExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * @return \Illuminate\Support\Collection
     */

    protected $anneeActiveId;

    public function __construct($anneeActiveId)
    {
        $this->anneeActiveId = $anneeActiveId;
    }

    public function collection()
    {
        // Recupere les enseignants qui ont été ajouté à l'annee active
        return Professeur::whereHas('anneeAcademiques', function ($query) {
            $query->where('annee_universitaire_id', $this->anneeActiveId);
        })->with(['anneeAcademiques' => function ($query) {
            $query->where('annee_universitaire_id', $this->anneeActiveId);
        }])->get();
    }

    public function map($professeur): array
    {
        $pivot = $professeur->anneeAcademiques->first()->pivot;

        // Retourne les donnees qui seront dans le fichier excel
        return [
            $professeur->matricule,
            $professeur->nom_prenom,
            $professeur->sexe,
            $professeur->date_naissance,
            $professeur->pays,
            $professeur->specialite,
            $professeur->telephone,
            $pivot->diplome,
            $pivot->grade,
            $pivot->statut,
            $pivot->annee_prise_fonction,
            $pivot->formation_continue,
            $pivot->nombre_heure_cours_prevue,
            $pivot->nombre_heure_cours_realise,
        ];
    }

    // L'entete du fichier
    public function headings(): array
    {
        return ['Matricule', 'Nom et prénom', 'Sexe', 'Date de naissance', 'Pays', 'Spécialité', 'Telephone', 'Diplome', 'Grade', 'Statut', 'Année de prise de fonction', 'Formation continue', "Nombre d'heure de cours prevue / An", "Nombre d'heure de cours realisée / An"];
    }
}

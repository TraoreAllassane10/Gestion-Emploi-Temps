<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnneeUniversitaire extends Model
{
    /** @use HasFactory<\Database\Factories\AnneeScolaireFactory> */
    use HasFactory;

    protected $fillable = ["libelle", "date_debut", "date_fin", 'estActive'];

    protected $casts = [
        "date_debut" => "date:d-m-Y",
        "date_fin" => "date:d-m-Y",
    ];

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    public function scolarites()
    {
        return $this->hasMany(Scolarite::class);
    }

    public function professeurs()
    {
        return $this->belongsToMany(Professeur::class, "annee_professeurs")
            ->withPivot("diplome", "grade", "statut", "annee_prise_fonction", "formation_continue", "nombre_heure_cours_prevue", "nombre_heure_cours_realise");
    }
}

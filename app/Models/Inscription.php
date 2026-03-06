<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    /** @use HasFactory<\Database\Factories\InscriptionFactory> */
    use HasFactory;

    protected $guarded = [];

    protected $with = ["etudiant", "annee", "niveaux"];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function annee()
    {
        return $this->belongsTo(AnneeUniversitaire::class, "annee_universitaire_id");
    }

    public function niveaux()
    {
        return $this->belongsToMany(Niveau::class, "inscription_niveau");
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }
}

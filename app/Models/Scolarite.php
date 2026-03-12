<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scolarite extends Model
{
    /** @use HasFactory<\Database\Factories\ScolariteFactory> */
    use HasFactory;

    protected $fillable = [
        "annee_universitaire_id",
        "niveau_id",
        "type",
        "montant"
    ];

    protected $with = ["annee", "niveau"];

    public function annee()
    {
        return $this->belongsTo(AnneeUniversitaire::class, "annee_universitaire_id");
    }

    public function niveau()
    {
        return $this->belongsTo(Niveau::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    /** @use HasFactory<\Database\Factories\InscriptionFactory> */
    use HasFactory;

    protected $guarded = [];

    public function Etudiant() {
        return $this->belongsTo(Etudiant::class);
    }

    public function anneeAcademique() {
        return $this->belongsTo(AnneeUniversitaire::class);
    }

    public function inscription_niveau() {
        return $this->belongsToMany(Niveau::class, "inscription_niveau");
    }
}

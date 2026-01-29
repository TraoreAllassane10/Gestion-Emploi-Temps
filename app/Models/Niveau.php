<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Niveau extends Model
{
    /** @use HasFactory<\Database\Factories\NiveauFactory> */
    use HasFactory;

    protected $fillable = ["nom", "filiere_id"];

    protected $with = ['filiere'];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function etudiants(): BelongsToMany
    {
        return $this
            ->belongsToMany(Etudiant::class, "etudiant_niveau")
            ->wherePivot("annee_scolaire_id")
            ->withTimestamps();
    }
}

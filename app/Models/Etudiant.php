<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use SebastianBergmann\CodeCoverage\Node\Builder;

class Etudiant extends Model
{
    /** @use HasFactory<\Database\Factories\EtudiantFactory> */
    use HasFactory;

    protected $primaryKey = "ip";
    public $incrementing = false;
    protected $keyType = "string";

    protected $fillable = [
        "ip",
        "nom",
        "prenom",
        "date_naissance",
        "lieu_naissance",
        "numero",
        "nom_parent",
        "numero_parent"
    ];

    public function niveaux(): BelongsToMany
    {
        return $this
            ->belongsToMany(Niveau::class, "etudiant_niveau", "ip", "niveau_id", "ip", "id")
            ->withPivot("annee_scolaire_id")
            ->withTimestamps();
    }
}

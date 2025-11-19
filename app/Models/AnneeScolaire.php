<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnneeScolaire extends Model
{
    /** @use HasFactory<\Database\Factories\AnneeScolaireFactory> */
    use HasFactory;

    protected $fillable = ["libelle", "date_debut", "date_fin"];

    protected $casts = [
        "date_debut" => "date:d-m-Y",
        "date_fin" => "date:d-m-Y",
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professeur extends Model
{
    /** @use HasFactory<\Database\Factories\ProfesseurFactory> */
    use HasFactory;

    protected $fillable = ["nom", "prenom", "email", "telephone"];

    public function cours () {
        return $this->hasMany(Cours::class);
    }
}

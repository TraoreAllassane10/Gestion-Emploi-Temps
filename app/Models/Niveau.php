<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    /** @use HasFactory<\Database\Factories\NiveauFactory> */
    use HasFactory;

    protected $fillable = ["nom", "filiere_id"];

    public function filiere() 
    {
        return $this->belongsTo(Filiere::class);
    }
}

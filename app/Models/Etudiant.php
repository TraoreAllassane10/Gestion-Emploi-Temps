<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    /** @use HasFactory<\Database\Factories\EtudiantFactory> */
    use HasFactory;

    protected $primaryKey = "ip";
    public $incrementing = false;
    protected $keyType = "string";

    protected $guarded = [];

}

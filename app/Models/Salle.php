<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use phpDocumentor\Reflection\Types\Self_;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Salle extends Model
{
    /** @use HasFactory<\Database\Factories\SalleFactory> */
    use HasFactory;

    protected $fillable = ["nom"];

    public function seances()
    {
        return $this->hasMany(Seance::class);
    }

    public static function sallesNonOccupeeActuellement($heureActuelle)
    {
        return Self::whereDoesntHave("seances", function ($query) use ($heureActuelle) {
            $query->where("date", Carbon::today()->format("Y-m-d"))
                ->where("heure_debut", "<=", $heureActuelle)
                ->where("heure_fin", ">=", $heureActuelle);
        })->get();
    }
}

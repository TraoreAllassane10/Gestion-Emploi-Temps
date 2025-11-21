<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
  /** @use HasFactory<\Database\Factories\SeanceFactory> */
  use HasFactory;

  protected $fillable = ["jours", "date", "heure_debut", "heure_fin", "cours_id", "professeur_id", "salle_id", "niveau_id", "annee_scolaire_id"];

  // protected $casts = [
  //   "date" =>
  // ];

  protected $with = ["cours", "professeur", "salle", "niveau"];

  public function cours()
  {
    return $this->belongsTo(Cours::class);
  }

  public function professeur()
  {
    return $this->belongsTo(Professeur::class);
  }

  public function salle()
  {
    return $this->belongsTo(Salle::class);
  }

  public function niveau()
  {
    return $this->belongsTo(Niveau::class);
  }

  //Permet de savoir si une salle est occupée durant une plage horaire
  public static function salleOccupee($salle_id, $date, $debut, $fin)
  {
    return self::where("salle_id", $salle_id)
      ->where("date", $date)
      ->where(function ($query) use ($debut, $fin) {
        return $query->where('heure_debut', '<', $fin)->where('heure_fin', '>', $debut);
      })->exists();
  }
}

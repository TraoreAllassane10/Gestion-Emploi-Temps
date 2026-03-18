<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
  /** @use HasFactory<\Database\Factories\SeanceFactory> */
  use HasFactory;

  protected $fillable = ["jour", "date", "semaine_id", "horaire_id", "cours_id", "professeur_id", "salle_id", "niveau_id", "annee_universitaire_id"];


  protected $with = ["cours", "professeur", "salle", "niveau", "horaire"];

  public function horaire()
  {
    return $this->belongsTo(Horaire::class);
  }

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

  //Permet de savoir si une salle est occupée durant une plage horaire selon une date
  public static function salleOccupee($salle_id, $date, $horaire_id)
  {
    return self::where("salle_id", $salle_id)
      ->where("date", $date)
      ->where("horaire_id", $horaire_id)
      ->exists();
  }

  //Permet de savoir si un un professeur est occupée durant une plage horaire selon une date
  public static function professeurOccupe($professeur_id, $date, $horaire_id)
  {
    return self::where("professeur_id", $professeur_id)
      ->where("date", $date)
      ->where("horaire_id", $horaire_id)
      ->exists();
  }
}

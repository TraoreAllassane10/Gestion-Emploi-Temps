<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    /** @use HasFactory<\Database\Factories\PaiementFactory> */
    use HasFactory;

    protected $guarded = [];

    protected $with = ["receveur"];

    public function inscription() {
        return $this->belongsTo(Inscription::class);
    }

    public function receveur() {
        return $this->belongsTo(User::class, "receveur_id");
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    /** @use HasFactory<\Database\Factories\ActivityLogFactory> */
    use HasFactory;

    protected $fillable = [
        "user_id",
        "action",
        "entite_type",
        "entite_id",
        "ancienne_valeur",
        "nouvelle_valeur"
    ];

    protected $casts = [
        "ancienne_valeur" => "array",
        "nouvelle_valeur" => "array"
    ];
}

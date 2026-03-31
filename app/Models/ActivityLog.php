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
        "user_name",
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

    protected $with = ["user"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

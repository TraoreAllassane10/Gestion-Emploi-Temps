<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seances', function (Blueprint $table) {
            $table->id();
            $table->string("jours");
            $table->timestamp("date");
            $table->time("heure_debut");
            $table->time("heure_fin");

            $table->foreignId("semaine_id")->constrained()->onDelete("cascade");
            $table->foreignId("horaire_id")->constrained()->onDelete("cascade");
            $table->foreignId("cours_id")->constrained()->onDelete("cascade");
            $table->foreignId("professeur_id")->constrained()->onDelete("cascade");
            $table->foreignId("salle_id")->constrained()->onDelete("cascade");
            $table->foreignId("niveau_id")->constrained()->onDelete("cascade");
            $table->foreignId("annee_universitaire_id")->constrained()->onDelete("cascade");

            $table->index(['semaine_id', 'cours_id', 'professeur_id', 'niveau_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seances');
    }
};

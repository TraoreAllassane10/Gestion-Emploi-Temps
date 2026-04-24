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
        Schema::create('annee_professeurs', function (Blueprint $table) {
            $table->id();

            $table->foreignId('professeur_id')->constrained();
            $table->foreignId("annee_universitaire_id")->constrained();

            $table->string("diplome");
            $table->integer("grade");
            $table->integer("statut");
            $table->integer("annee_prise_fonction");
            $table->integer("formation_continue")->nullable();
            $table->integer("nombre_heure_cours_prevue")->nullable();
            $table->integer("nombre_heure_cours_realise")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annee_professeurs');
    }
};

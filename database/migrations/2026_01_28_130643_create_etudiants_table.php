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
        Schema::create('etudiants', function (Blueprint $table) {
            // Identifiant permanent de l'etudiant
            $table->string("ip")->primary();
            
            $table->string("nom");
            $table->string("prenom");
            $table->date("date_naissance");
            $table->string("lieu_naissance");
            $table->integer("numero");
            $table->string("nom_parent");
            $table->integer("numero_parent");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etudiants');
    }
};

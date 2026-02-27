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
        Schema::create('scolarites', function (Blueprint $table) {
            $table->id();
            
            $table->integer('frais_inscription');
            $table->integer('frais_mensuel');
            $table->integer('nombre_mois');
            $table->integer('montant_total');


            $table->foreignId("annee_universitaire_id")->constrained()->onDelete("cascade");

            $table->index(['annee_universitaire_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scolarites');
    }
};

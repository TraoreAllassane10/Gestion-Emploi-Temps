<?php

use App\Models\Etudiant;
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
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();

            $table->date('date');
            $table->string('status')->nullable();
            $table->integer("taux_reduction");

            // Garder l'historique des frais d'inscription
            $table->integer("frais_annexe");
            $table->integer("montant_scolarite");
            $table->integer("montant_total");

            $table->foreignIdFor(Etudiant::class)->constrained();
            $table->foreignId("annee_universitaire_id")->constrained()->onDelete("cascade");

            $table->index(['etudiant_ip', 'annee_universitaire_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};

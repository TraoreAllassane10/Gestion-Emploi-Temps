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

            $table->string('status')->nullable();
            $table->integer("taux_reduction");

            $table->foreignIdFor(Etudiant::class)->constrained();
            $table->foreignId("niveau_id")->constrained()->onDelete("cascade");
            $table->foreignId("annee_universitaire_id")->constrained()->onDelete("cascade");

            $table->index(['etudiant_ip','niveau_id','annee_universitaire_id']);

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

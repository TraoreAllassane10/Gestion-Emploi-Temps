<?php

use App\Enums\TypeInscription;
use App\Models\AnneeUniversitaire;
use App\Models\Etudiant;
use App\Models\FraisConfiguration;
use App\Models\Niveau;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('Un utilisateur peut effectuer une inscription', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $etudiant = Etudiant::factory()->create();
    $annee = AnneeUniversitaire::factory()->active()->create();
    $niveau = Niveau::factory()->withScolarite()->create();
    $frais = FraisConfiguration::factory()->create();

    $response = $this->post("/inscriptions/create", [
        "taux_reduction" => 0,
        "type_inscription" => TypeInscription::NOUVELLE->value,
        "etudiant_ip" => $etudiant->ip,
        "annee_id" => $annee->id,
        "niveaux" => $niveau->id
    ]);

    // $response->assertStatus(200);
    $this->assertDatabaseCount("inscriptions", 1);
});

<?php

use App\Enums\StatutEtudiant;
use App\Models\Etudiant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

test('Un utilisateur peut creer un etudiant', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $data = [
        "ip" => strtoupper(Str::random(10)),

        "civilite" => "M.",
        "genre" => 'Masculin',

        "nom" => "Traore",
        "prenom" => "Allassane",

        "date_naissance" => "04/08/2004",

        "lieu_naissance" => "Daloa",

        "nationnalite" => "Ivoirienne",

        "statut" => StatutEtudiant::AFFECTE->value,

    ];

    $response = $this->post("/etudiants", $data);

    $response->assertStatus(200);

    $this->assertDatabaseCount("etudiants", 1);
});

test("Un utilisateur peut modifier un etudiant", function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $etudiant = Etudiant::factory()->create();

    $data = [
        "ip" => $etudiant->ip,
        "civilite" => "M.",
        "genre" => 'Masculin',

        "nom" => "Traore",
        "prenom" => "Allassane",

        "date_naissance" => "04/08/2004",

        "lieu_naissance" => "Daloa",

        "nationnalite" => "Ivoirienne",

        "statut" => StatutEtudiant::AFFECTE->value,

    ];

    $response = $this->put("/etudiants/{$etudiant->ip}/update", $data, [
        "accept" => "application/json"
    ]);

    $this->assertDatabaseHas("etudiants", [
        "ip" => $etudiant->ip,
        "nom" => "Traore",
        "prenom" => "Allassane"
    ]);
});

<?php

use App\Models\AnneeUniversitaire;
use App\Models\User;
use App\Services\AnneeAcademiqueService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('Un utilisateur peut creer une année academique', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->post('/annee', [
        "libelle" => "2025-2026",
        "date_debut" => "10/10/24",
        "date_fin" => "10/08/25",
        "estActive" => true
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas("annee_universitaires", ["libelle" => "2025-2026",]);
});

test('On peut recuperer une année active', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    AnneeUniversitaire::factory()->create([
        "estActive" => false
    ]);

    $active = AnneeUniversitaire::factory()->create([
        "estActive" => true
    ]);

    $result = app(AnneeAcademiqueService::class)->getAnneeActive();

    expect($result->id)->toBe($active->id);
});

test('Date fin doit etre supérieur a date debut', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post("/annee", [
        "libelle" => "2025-2026",
        "date_debut" => "01-09-2025",
        "date_fin" => "01-01-2025"
    ]);

    $response->assertSessionHasErrors("date_fin");
});

test('Un utilisateur peut supprimer une année', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $annee = AnneeUniversitaire::factory()->create();

    $response = $this->delete("annee/{$annee->id}/delete");

    $this->assertDatabaseMissing("annee_universitaires", ["id" => $annee->id]);
});

test("Un utlisateur peut modifier une année", function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $annee = AnneeUniversitaire::factory()->create();

    $response = $this->put("/annee/{$annee->id}/update", [
        "id" => $annee->id,
        "libelle" => "2025-2026",
        "date_debut" => "01-01-2025",
        "date_fin" => "01-09-2025",
        "estActive" => 0
    ]);

    $this->assertDatabaseHas("annee_universitaires", [
        "id" => $annee->id,
        "libelle" => "2025-2026",
    ]);
});

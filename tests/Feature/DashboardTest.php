<?php

use App\Models\AnneeUniversitaire;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $annee = AnneeUniversitaire::factory()->create([
        "estActive" => 1
    ]);

    $this->actingAs($user = User::factory()->create());

    $this->get(route('dashboard'))->assertOk();
});

<?php

namespace Database\Factories;

use App\Enums\ScolariteType;
use App\Models\AnneeUniversitaire;
use App\Models\Niveau;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Scolarite>
 */
class ScolariteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "type" => ScolariteType::AFFECTE,
            "montant" => 145000,
            "niveau_id" => Niveau::factory(),
            "annee_universitaire_id" => AnneeUniversitaire::factory()
        ];
    }
}

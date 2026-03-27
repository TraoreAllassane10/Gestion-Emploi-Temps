<?php

namespace Database\Factories;

use App\Models\AnneeUniversitaire;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FraisConfiguration>
 */
class FraisConfigurationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "type" => "frais_annexe",
            "montant" => 20000,
            "annee_universitaire_id" => AnneeUniversitaire::factory()
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AnneeUniversitaire>
 */
class AnneeUniversitaireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date_debut = fake()->dateTimeBetween("-2 years", "now");
        $date_fin = (clone $date_debut)->modify("+9 months");

        return [
            "libelle" => $date_debut->format("Y") . "-" . $date_fin->format('Y'),
            "date_debut" => $date_debut->format("Y-m-d"),
            "date_fin" => $date_fin->format("Y-m-d"),
        ];
    }

    public function active(): static
    {
        return $this->state(fn() => [
            "estActive" => 1
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn() => ["estActive" => 0]);
    }
}

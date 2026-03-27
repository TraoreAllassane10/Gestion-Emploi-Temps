<?php

namespace Database\Factories;

use App\Models\Filiere;
use App\Models\Scolarite;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Niveau>
 */
class NiveauFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "nom" => fake()->word(),
            "filiere_id" => Filiere::factory()
        ];
    }

    public function withScolarite()
    {
        return $this->afterCreating(function ($niveau) {
           $scolarite = Scolarite::factory()->create();

           $niveau->scolarites()->save($scolarite);
        });
    }
}

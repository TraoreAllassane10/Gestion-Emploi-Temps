<?php

namespace Database\Factories;

use App\Enums\TypeInscription;
use App\Models\AnneeUniversitaire;
use App\Models\Etudiant;
use App\Models\Niveau;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inscription>
 */
class InscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "date" => fake()->dateTimeBetween(now(), "+2 months"),
            "status" => "Bon",
            "taux_reduction" => 0,
            "frais_annexe" => 20000,
            "montant_scolarite" => 145000 + 20000,
            "type_inscription" => TypeInscription::NOUVELLE->value,
            "etudiant_ip" => Etudiant::factory(),
            "annee_id" => AnneeUniversitaire::factory()
        ];
    }

    // public function configure()
    // {
    //     return $this->afterCreating(function ($inscription) {
    //         $niveau = Niveau::factory()->create();

    //         $inscription->niveaux()->attach($niveau->id);
    //     });
    // }

    public function withNiveaux($count = 1)
    {
        return $this->afterCreating(function ($inscription) use ($count) {
            $niveaux = Niveau::factory()->count($count)->create();

            $inscription->niveaux()->attach($niveaux);
        });
    }
}

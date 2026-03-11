<?php

namespace Database\Factories;

use App\Enums\StatutEtudiant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Etudiant>
 */
class EtudiantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $noms = [
            'Traoré',
            'Koné',
            'Ouattara',
            'Bamba',
            'Touré',
            'Kouassi',
            'Koffi',
            'Yao',
            'Kouamé',
            'Diallo',
            'Sangaré',
            'Coulibaly',
            "Konan",
            "Yeo",
            "Fofana"
        ];

        $prenoms = [
            'Moussa',
            'Ibrahim',
            'Adama',
            'Fatou',
            'Aïcha',
            'Andrea',
            "Arielle",
            "Carelle",
            "Moctar",
            'Mariame',
            'Abdoulaye',
            'Ismaël',
            'Kader',
            'Aminata',
            "Richard",
            "Jean Marc",
            "Paul"
        ];

        $villes = [
            'Abidjan',
            'Bouaké',
            'Daloa',
            'Korhogo',
            'Yamoussoukro',
            'San Pedro',
            'Man',
            'Gagnoa',
            'Odienné',
            'Bondoukou'
        ];

        $seriesBac = ['A1', 'A2', 'C', 'D', 'G1', 'G2', "E"];

        return [
            "ip" => strtoupper(Str::random(10)),

            "civilite" => $this->faker->randomElement(['M.', 'Mme', 'Mlle']),
            "genre" => $this->faker->randomElement(['Masculin', 'Féminin']),

            "nom" => $this->faker->randomElement($noms),
            "prenom" => $this->faker->randomElement($prenoms),

            "date_naissance" => $this->faker->dateTimeBetween('-25 years', '-18 years'),

            "lieu_naissance" => $this->faker->randomElement($villes),

            "nationnalite" => "Ivoirienne",

            "statut" => $this->faker->randomElement(
                array_map(fn($case) => $case->value, StatutEtudiant::cases())
            ),

            "email" => $this->faker->safeEmail(),
            "pays_residence" => "Côte d'Ivoire",

            "etablissement_origine" => $this->faker->randomElement([
                'Lycée Moderne de Daloa',
                'Lycée Classique d’Abidjan',
                'Lycée Scientifique de Yamoussoukro',
                'Lycée Moderne de Bouaké',
                'Lycée Moderne de Korhogo'
            ]),

            "annee_obtention_bac" => $this->faker->numberBetween(2015, 2024),

            "serie_bac" => $this->faker->randomElement($seriesBac),

            "numero_table_bac" => $this->faker->numerify('CI########'),

            "contacts" => "07" . $this->faker->numerify("########"),

            "nature_piece" => $this->faker->randomElement([
                "CNI",
                "Attestation d'identité",
                "Passeport"
            ]),

            "numero_piece" => strtoupper(Str::random(8)),

            "adresse_geographique" => $this->faker->streetAddress(),

            "matricule_secondaire" => $this->faker->numerify('MAT####'),

            "type_responsable" => $this->faker->randomElement([
                "Père",
                "Mère",
                "Tuteur"
            ]),

            "nom_responsable" => $this->faker->randomElement($noms) . " " . $this->faker->randomElement($prenoms),

            "numero_responsable" => "07" . $this->faker->numerify("########"),

            "profession_responsable" => $this->faker->randomElement([
                "Commerçant",
                "Fonctionnaire",
                "Agriculteur",
                "Enseignant",
                "Chauffeur",
                "Entrepreneur"
            ]),

        ];
    }
}

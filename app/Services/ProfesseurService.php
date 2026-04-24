<?php

namespace App\Services;

use App\Models\Professeur;
use App\Repositories\ProfesseurRepository;

class ProfesseurService
{

    public function __construct(
        protected ProfesseurRepository $professeurRepository
    ) {}

    public function getAllProfesseurs()
    {
        return $this->professeurRepository->all();
    }

    public function getAllProfesseur(Professeur $professeur)
    {
        return $this->professeurRepository->find($professeur);
    }

    public function getProfesseurNonEnregistreDabord()
    {
        return $this->professeurRepository->professeurNonEnregistreDabord();
    }

    public function createProfesseur(array $data)
    {
        return $this->professeurRepository->create($data);
    }

    public function updateProfesseur(Professeur $professeur, array $data)
    {
        return $this->professeurRepository->update($professeur, $data);
    }

    public function deleteProfesseur(Professeur $professeur)
    {
        return $this->professeurRepository->delete($professeur);
    }
}

<?php

namespace App\Services;

use App\Models\Salle;
use App\Repositories\SalleRepository;

class SalleService
{

    public function __construct(
        protected SalleRepository $salleRepository
    ){}

     public function getAllSalles() {
        return $this->salleRepository->all();
    }

    public function createSalle(array $data) {
        return $this->salleRepository->create($data);
    }

    public function updateSalle(Salle $salle, array $data) {
        return $this->salleRepository->update($salle, $data);
    }

    public function deleteSalle(Salle $salle) {
        return $this->salleRepository->delete($salle);
    }
}

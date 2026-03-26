<?php

namespace App\Repositories;

use App\Models\Professeur;

class ProfesseurRepository
{
     public function all()
    {
        return Professeur::latest()->get();
    }

    public function create(array $data)
    {
        return Professeur::create($data);
    }

    public function update(Professeur $professeur, array $data)
    {
        return $professeur->update($data);
    }

    public function delete(Professeur $professeur)
    {
        return $professeur->delete();
    }
}

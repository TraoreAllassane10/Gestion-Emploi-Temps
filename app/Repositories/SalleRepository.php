<?php

namespace App\Repositories;

use App\Models\Salle;

class SalleRepository
{
    public function all()
    {
        return Salle::with("site")->latest()->get();
    }

    public function create(array $data)
    {
        return Salle::create($data);
    }

    public function update(Salle $salle, array $data)
    {
        return $salle->update($data);
    }

    public function delete(Salle $salle)
    {
        return $salle->delete();
    }
}

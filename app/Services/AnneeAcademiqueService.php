<?php

namespace App\Services;

use App\Http\Resources\AnneeScolaireResource;
use App\Models\AnneeUniversitaire;
use App\Repositories\AnneeAcademiqueRepository;
use Illuminate\Support\Facades\DB;

class AnneeAcademiqueService
{

    public function __construct(
        protected AnneeAcademiqueRepository $anneeAcademiqueRepository
    ) {}

    public function all()
    {
        $annees = $this->anneeAcademiqueRepository->all();
        return AnneeScolaireResource::collection($annees);
    }

    public function find(string $id)
    {
        return AnneeUniversitaire::find($id);
    }

    public function create(array $data)
    {
        //Creation d'une année scolaire
        return $this->anneeAcademiqueRepository->create($data);
    }

    public function update(AnneeUniversitaire $annee, array $data)
    {
        return  $this->anneeAcademiqueRepository->update($annee, $data);
    }

    public function delete(AnneeUniversitaire $annee)
    {
        return $this->anneeAcademiqueRepository->delete($annee);
    }

    public function editAnneeActive()
    {
        $anneeActive = AnneeUniversitaire::where("estActive", 1)->first();
        $touteLesAnnees = AnneeUniversitaire::orderByDesc("date_fin")->get();

        return [$anneeActive, $touteLesAnnees];
    }

    public function changeAnneeActive(string $id)
    {
        DB::transaction(function () use ($id) {
            // Desactive l'annee actuelle active
            $anneeActuellementActive = AnneeUniversitaire::where("estActive", 1)->first();
            $anneeActuellementActive->estActive = 0;
            $anneeActuellementActive->save();

            $annee = AnneeUniversitaire::find($id);
            $annee->estActive = 1;
            $annee->save();
        });
    }
}

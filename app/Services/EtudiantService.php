<?php

namespace App\Services;

use App\Http\Resources\EtudiantRessource;
use App\Models\Etudiant;
use App\Repositories\EtudiantRepository;
use Barryvdh\DomPDF\Facade\Pdf;

class EtudiantService
{

    public function __construct(
        protected EtudiantRepository $etudiantRepository
    ) {}

    public function all()
    {
        return EtudiantRessource::collection($this->etudiantRepository->all());
    }

    public function find(string $etudiant)
    {
        return $this->etudiantRepository->find($etudiant);
    }

    public function create(array $data)
    {
        return $this->etudiantRepository->create($data);
    }

    public function update(Etudiant $etudiant, array $data)
    {
        return $this->etudiantRepository->update($etudiant, $data);
    }

    public function delete(Etudiant $etudiant)
    {
        return $this->etudiantRepository->delete($etudiant);
    }

    public function ficheIdentification(string $etudiant)
    {
        $etudiantData = Etudiant::where("ip", $etudiant)->first()->toArray();
        $pdf = Pdf::loadView("pdf.fiche_etudiant", [
            "etudiant" => $etudiantData
        ]);

        return $pdf->stream("fiche_identification.pdf");
    }

    public function totalEtudiant() {
        return $this->etudiantRepository->totalEtudiant();
    }

    public function totalEtudiantParStatut(string $statut) {
        return $this->etudiantRepository->totalEtudiantParStatut($statut);
    }
}

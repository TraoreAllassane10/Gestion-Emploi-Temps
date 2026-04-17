<?php

namespace App\Http\Controllers\Administrateur;

use App\Http\Controllers\Controller;
use App\Http\Requests\paiement\CreatePaiementRequest;
use App\Models\Etudiant;
use App\Models\Inscription;
use App\Models\Paiement;
use App\Services\PaiementService;

class PaiementController extends Controller
{
    public function __construct(
        protected PaiementService $paiementService
    ) {}

    public function store(CreatePaiementRequest $request, string $inscriptionId)
    {
        $data = $request->validated();

        return $this->paiementService->createPaiement($inscriptionId, $data);
    }

    public function recu(Paiement $paiement)
    {
        $pdf = $this->paiementService->getRecuPaiement($paiement);

        return $pdf->stream("reçu_{$paiement->inscription->etudiant->nom}_{$paiement->inscription->etudiant->prenom}_{$paiement->date}.pdf");
    }

    public function recapitulatifPaiement(Inscription $inscription)
    {
        $pdf = $this->paiementService->getRecapPaiements($inscription);

        return $pdf->stream("paiments_{$inscription->etudiant->nom}_{$inscription->etudiant->prenom}.pdf");
    }
}

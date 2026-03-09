<?php

namespace App\Http\Controllers\Administrateur;

use App\Http\Controllers\Controller;
use App\Http\Requests\paiement\CreatePaiementRequest;
use App\Models\Inscription;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PaiementController extends Controller
{
    public function store(CreatePaiementRequest $request, string $inscriptionId)
    {
        $data = $request->validated();

        // Verifie si l'inscription existe
        $inscriptionExist = Inscription::where("id", $inscriptionId)->exists();
        if (!$inscriptionExist) {
            return response()->json(["success" => false, "message" => "Inscription introuvable"]);
        }

        // Recupération de l'inscription
        $inscription = Inscription::where("id", $inscriptionId)
            ->with("paiements")
            ->withSum("paiements as total_paiements", "montant")
            ->first();

        // Calcule le reste à payer
        $resetPaye = $inscription->montant_total - $inscription->total_paiements;

        if ($resetPaye === 0) {
            return response()->json(["success" => false, "message" => "Cet etudiant a soldé"]);
        }


        if ($data['montant'] <= $resetPaye) {
            // Effectue le paiement
            $inscription->paiements()->create([
                "reference" => $data['reference'],
                "date_paiement" => Carbon::parse($data['date_paiement']),
                "methode_paiement" => Str::upper($data['methode_paiement']),
                "montant" => $data['montant'],
                "receveur_id" => Auth::user()->id
            ]);

            // Exporte le reçu
            $pdf = Pdf::loadView("pdf.recu_paiement", [
                "inscription" => $inscription,
                "reference" => $data['reference'],
                "date" => Carbon::parse($data['date_paiement'])->format('d-m-Y'),
                "montant" => $data['montant'],
                "reste" => $resetPaye - $data['montant'] 
            ]);
            return $pdf->stream("reçu_paiement");

            // return response()->json(["success" => true, "message" => "Paiement effectué avec succés !"]);
        }
    }
}

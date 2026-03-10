<?php

namespace App\Http\Controllers\Administrateur;

use App\Http\Controllers\Controller;
use App\Http\Requests\paiement\CreatePaiementRequest;
use App\Models\Inscription;
use App\Models\Paiement;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
            $paiement = $inscription->paiements()->create([
                "reference" => $data['reference'],
                "date_paiement" => Carbon::parse($data['date_paiement']),
                "methode_paiement" => Str::upper($data['methode_paiement']),
                "montant" => $data['montant'],
                "receveur_id" => Auth::user()->id
            ]);

            $recu_url = route("paiements.recu", $paiement->id);

            Log::info("Reçu url", [$recu_url]);

            return response()->json([
                "success" => true,
                "message" => "Paiement effectué avec succés !",
                "recu_url" => $recu_url
            ]);
        }
    }

    public function recu(Paiement $paiement)
    {
        $paiement->load(
            "inscription",
            "receveur"
        );


        // Total jusqu'à ce paiement
        $totalPaye = Paiement::where("inscription_id", $paiement->inscription_id)
            ->where("id", "<=", $paiement->id)
            ->sum("montant");

        $montantTotalScolarite = $paiement->inscription->montant_total;

        $restePaye = $montantTotalScolarite - $totalPaye;

        // Exporte le reçu
        $pdf = Pdf::loadView("pdf.recu_paiement", [
            "paiement" => $paiement,
            "reste" => $restePaye
        ]);

        return $pdf->stream("reçu_{$paiement->inscription->etudiant->nom}_{$paiement->inscription->etudiant->prenom}_{$paiement->date}.pdf");
    }
}

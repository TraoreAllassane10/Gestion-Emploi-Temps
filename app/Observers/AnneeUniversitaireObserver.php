<?php

namespace App\Observers;

use App\Enums\TypeAction;
use App\Models\ActivityLog;
use App\Models\AnneeUniversitaire;
use Illuminate\Support\Facades\Auth;

class AnneeUniversitaireObserver
{
    /**
     * Handle the AnneeUniversitaire "created" event.
     */
    public function created(AnneeUniversitaire $anneeUniversitaire): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
            "user_name" => Auth::user()->name,
            "action" => TypeAction::CREATION->value,
            "entite_type" => "Année Academique",
            "entite_id" => (string) $anneeUniversitaire->id,
            "nouvelle_valeur" => $anneeUniversitaire->toArray()
        ]);
    }

    /**
     * Handle the AnneeUniversitaire "updated" event.
     */
    // public function updated(AnneeUniversitaire $anneeUniversitaire): void
    // {
    //     ActivityLog::create([
    //         "user_id" => Auth::user()->id,
    //         "user_name" => Auth::user()->name,
    //         "action" => TypeAction::MODIFICATION->value,
    //         "entite_type" => "Année Academique",
    //         "entite_id" => (string) $anneeUniversitaire->id,
    //         "ancienne_valeur" => $anneeUniversitaire->getOriginal(),
    //         "nouvelle_valeur" => $anneeUniversitaire->getChanges()
    //     ]);
    // }

    /**
     * Handle the AnneeUniversitaire "deleted" event.
     */
    public function deleted(AnneeUniversitaire $anneeUniversitaire): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
            "user_name" => Auth::user()->name,
            "action" => TypeAction::SUPPRESSION->value,
            "entite_type" => "Année Academique",
            "entite_id" => (string) $anneeUniversitaire->id,
            "ancienne_valeur" => $anneeUniversitaire->getOriginal(),
        ]);
    }

    /**
     * Handle the AnneeUniversitaire "restored" event.
     */
    public function restored(AnneeUniversitaire $anneeUniversitaire): void
    {
        //
    }

    /**
     * Handle the AnneeUniversitaire "force deleted" event.
     */
    public function forceDeleted(AnneeUniversitaire $anneeUniversitaire): void
    {
        //
    }
}

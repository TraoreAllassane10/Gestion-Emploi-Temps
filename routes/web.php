<?php

use App\Http\Controllers\AnneeScolaireController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\NiveauController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\SeanceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('auth/login', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', function () {
        echo "Administareur";
    });

    Route::get('/pedagogie', function () {
        echo "pedagogie";
    })->middleware('pedagodique');

    Route::get('/enseignant', function () {
        echo "enseignant";
    })->middleware('enseignant');

    Route::get('/scolarite', function () {
        echo "scolarite";
    })->middleware('service_scolarite');

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    //Routes annnée scolaire
    Route::controller(AnneeScolaireController::class)->group(function () {
        Route::get("annee", "index")->name("annee");
        Route::post("annee", "store")->name("annee.store");
        Route::get("annee/{annee}/edit", "edit")->name("annee.edit");
        Route::put("annee/{annee}/update", "update")->name("annee.update");
        Route::delete("annee/{annee}/delete", "delete")->name("annee.delete");
    });

    //Routes filiere
    Route::controller(FiliereController::class)->group(function () {
        Route::get("filiere", "index")->name("filiere");
        Route::post("filiere", "store")->name("filiere.store");
        Route::get("filiere/{filiere}/edit", "edit")->name("filiere.edit");
        Route::put("filiere/{filiere}/update", "update")->name("filiere.update");
        Route::delete("filiere/{filiere}/delete", "delete")->name("filiere.delete");
    });

    // Routes Niveau
    Route::controller(NiveauController::class)->group(function () {
        Route::get("niveau", "index")->name("niveau");
        Route::get("/niveau/{niveau}/emploi-du-temps", "emploiParNiveau")->name("niveau.emploi");
        Route::post("niveau", "store")->name("niveau.store");
        Route::get("niveau/{niveau}/edit", "edit")->name("niveau.edit");
        Route::put("niveau/{niveau}/update", "update")->name("niveau.update");
        Route::delete("niveau/{niveau}/delete", "delete")->name("niveau.delete");
    });

    // Routes Professeur
    Route::controller(ProfesseurController::class)->group(function () {
        Route::get("professeur", "index")->name("professeur");
        Route::post("professeur", "store")->name("professeur.store");
        Route::get("professeur/{professeur}/edit", "edit")->name("professeur.edit");
        Route::put("professeur/{professeur}/update", "update")->name("professeur.update");
        Route::delete("professeur/{professeur}/delete", "delete")->name("professeur.delete");
    });

    //Routes salle
    Route::controller(SalleController::class)->group(function () {
        Route::get("salle", "index")->name("salle");
        Route::post("salle", "store")->name("salle.store");
        Route::get("salle/{salle}/edit", "edit")->name("salle.edit");
        Route::put("salle/{salle}/update", "update")->name("salle.update");
        Route::delete("salle/{salle}/delete", "delete")->name("salle.delete");
    });

    //Routes cours
    Route::controller(CoursController::class)->group(function () {
        Route::get("cours", "index")->name("cours");
        Route::post("cours", "store")->name("cours.store");
        Route::get("cours/{cours}/edit", "edit")->name("cours.edit");
        Route::put("cours/{cours}/update", "update")->name("cours.update");
        Route::delete("cours/{cours}/delete", "delete")->name("cours.delete");
    });

    //Routes seance
    Route::controller(SeanceController::class)->group(function () {
        Route::get("seance", "index")->name("seance");
        Route::post("seance", "store")->name("seance.store");
        Route::get("seance/{seance}/edit", "edit")->name("seance.edit");
        Route::put("seance/{seance}/update", "update")->name("seance.update");
        Route::delete("seance/{seance}/delete", "delete")->name("seance.delete");
        Route::get("seance/export", "exportPDF")->name("seance.pdf");
    });

    //Routes Etudiant
    Route::controller(EtudiantController::class)->group(function () {
        Route::get("etudiants", "index")->name("etudiants");
        Route::get("etudiants/{etudiant}/show", "show")->name("etudiants.show");
        Route::get("etudiants/create", "create")->name("etudiants.create");
        Route::post("etudiants", "store")->name("etudiants.store");
        Route::get("etudiants/{etudiant}/edit", "edit")->name("etudiants.edit");
        Route::put("etudiants/{etudiant}/update", "update")->name("etudiants.update");
        Route::delete("etudiants/{etudiant}/delete", "delete")->name("etudiants.delete");
    });
});

require __DIR__ . '/settings.php';

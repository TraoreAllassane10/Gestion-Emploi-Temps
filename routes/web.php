<?php

use App\Http\Controllers\AnneeScolaireController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\NiveauController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\SalleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

//Routes proivisoire

Route::get("/cours", function () {
    return Inertia::render("cours/Index");
})->name("cours");

Route::get("/seance", function () {
    return Inertia::render("seance/Index");
})->name("seance");

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //Routes annnée scolaire
    Route::controller(AnneeScolaireController::class)->group(function() {
        Route::get("annee", "index")->name("annee");
        Route::post("annee", "store")->name("annee.store");
        Route::get("annee/{annee}/edit", "edit")->name("annee.edit");
        Route::put("annee/{annee}/update", "update")->name("annee.update");
        Route::delete("annee/{annee}/delete", "delete")->name("annee.delete");
    });

    //Routes filiere
    Route::controller(FiliereController::class)->group(function() {
        Route::get("filiere", "index")->name("filiere");
        Route::post("filiere", "store")->name("filiere.store");
        Route::get("filiere/{filiere}/edit", "edit")->name("filiere.edit");
        Route::put("filiere/{filiere}/update", "update")->name("filiere.update");
        Route::delete("filiere/{filiere}/delete", "delete")->name("filiere.delete");
    });

    // Routes Niveau
    Route::controller(NiveauController::class)->group(function() {
        Route::get("niveau", "index")->name("niveau");
        Route::post("niveau", "store")->name("niveau.store");
        Route::get("niveau/{niveau}/edit", "edit")->name("niveau.edit");
        Route::put("niveau/{niveau}/update", "update")->name("niveau.update");
        Route::delete("niveau/{niveau}/delete", "delete")->name("niveau.delete");
    });

     // Routes Professeur
    Route::controller(ProfesseurController::class)->group(function() {
        Route::get("professeur", "index")->name("professeur");
        Route::post("professeur", "store")->name("professeur.store");
        Route::get("professeur/{professeur}/edit", "edit")->name("professeur.edit");
        Route::put("professeur/{professeur}/update", "update")->name("professeur.update");
        Route::delete("professeur/{professeur}/delete", "delete")->name("professeur.delete");
    });

    //Routes salle
    Route::controller(SalleController::class)->group(function() {
        Route::get("salle", "index")->name("salle");
        Route::post("salle", "store")->name("salle.store");
        Route::get("salle/{salle}/edit", "edit")->name("salle.edit");
        Route::put("salle/{salle}/update", "update")->name("salle.update");
        Route::delete("salle/{salle}/delete", "delete")->name("salle.delete");
    });
});

require __DIR__.'/settings.php';

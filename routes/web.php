<?php

use App\Http\Controllers\AnneeScolaireController;
use App\Http\Controllers\FiliereController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

//Routes proivisoire
// Route::get("/annee", function () {
//     return Inertia::render("annee/Index");
// })->name("annee");
Route::get("/niveau", function () {
    return Inertia::render("niveau/Index");
})->name("niveau");
// Route::get("/filiere", function () {
//     return Inertia::render("filiere/Index");
// })->name("filiere");
Route::get("/professeur", function () {
    return Inertia::render("professeur/Index");
})->name("professeur");
Route::get("/cours", function () {
    return Inertia::render("cours/Index");
})->name("cours");
Route::get("/salle", function () {
    return Inertia::render("salle/Index");
})->name("salle");
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
});

require __DIR__.'/settings.php';

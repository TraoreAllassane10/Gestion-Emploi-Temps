<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Cours;
use App\Models\Salle;
use App\Models\Niveau;
use App\Models\Seance;
use App\Models\Professeur;
use Illuminate\Http\Request;
use App\Models\AnneeScolaire;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Resources\CoursResource;
use App\Http\Resources\SalleResource;
use App\Http\Resources\NiveauResource;
use App\Http\Resources\SeanceResource;
use App\Http\Resources\ProfesseurResource;
use App\Http\Requests\seance\CreateSeanceRequest;
use App\Http\Requests\seance\UpdateSeanceRequest;

class SeanceController extends Controller
{
    public function index(Request $request)
    {
        $salle = $request->query("salle");
        $niveau = $request->query("niveau");
        $professeur = $request->query("professeur");
        $date = $request->query("date");

        try {
            // Filtrage dynamique des séances
            $seances = Seance::when($salle, function($query) use($salle) {
                $query->where("salle_id", $salle);
            })
            ->when($niveau, function($query) use ($niveau) {
                $query->where("niveau_id", $niveau);
            })
            ->when($professeur, function($query) use ($professeur) {
                $query->where("professeur_id", $professeur);
            })
             ->when($date, function($query) use ($date) {
                $query->where("date", $date);
            })
            ->orderByDesc('date')
            ->paginate(10);


            return Inertia::render("seance/Index", [
                "seances" => SeanceResource::collection($seances),
                "professeurs" => ProfesseurResource::collection(Professeur::latest()->get()),
                "cours" => CoursResource::collection(Cours::latest()->get()),
                "salles" => SalleResource::collection(Salle::latest()->get()),
                "niveaux" => NiveauResource::collection(Niveau::latest()->get()),
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateSeanceRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            // Recupere la derniere année enregistrée et l'envoyer dans les données à stocker
            $data["annee_scolaire_id"] = AnneeScolaire::latest("created_at")->first()->id;

            $date = $data['date'];
            $salle = $data["salle_id"];
            $heure_debut = $data["heure_debut"];
            $heure_fin = $data['heure_fin'];
            $professeur = $data['professeur_id'];

            // Nous verifions si la salle est occupée sur la plage horaire qu'on souhaite ajouté selon la date
            if (Seance::salleOccupee($salle, $date, $heure_debut, $heure_fin)) {
                throw new Exception("Cette salle est occupée sur cette plage horaire");
            }

            // Nous verifions si le professeur est occupé sur la plage horaire qu'on souhaite ajouté selon la date
            if (Seance::professeurOccupe($professeur, $date, $heure_debut, $heure_fin)) {
                throw new Exception("Cet professeur est occupé sur cette plage horaire");
            }

            //Creation d'une séance
            Seance::create($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Seance $seance)
    {
        return Inertia::render("seance/Edit", [
            "seance" => $seance,
            "professeurs" => ProfesseurResource::collection(Professeur::latest()->get()),
            "cours" => CoursResource::collection(Cours::latest()->get()),
            "salles" => SalleResource::collection(Salle::latest()->get()),
            "niveaux" => NiveauResource::collection(Niveau::latest()->get()),
        ]);
    }

    public function update(UpdateSeanceRequest $request, Seance $seance)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $seance->update($data);

            return response()->json(["success" => "true"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Seance $seance)
    {
        try {
            //Suppression d'une seance
            $seance->delete();
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function exportPDF(Request $request)
    {
      
        $salle = $request->query("salle");
        $niveau = $request->query("niveau");
        $professeur = $request->query("professeur");
        $date = $request->query("date");

           

        try {
            if ($salle) {
                $seances = Seance::where("salle_id", $salle)->get();
            } elseif ($niveau) {
                $seances = Seance::where("niveau_id", $niveau)->get();
            } elseif ($professeur) {
                $seances = Seance::where("professeur_id", $professeur)->get();
            } elseif ($date) {
                $seances = Seance::where("date", $date)->get();
            } else {
                $seances = Seance::orderByDesc("date")->get();
            }


            $pdf = Pdf::loadView('pdf.emploi', compact("seances"));

            return $pdf->download('Emploi_du_temps.pdf');

        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}

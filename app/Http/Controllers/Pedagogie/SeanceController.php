<?php

namespace App\Http\Controllers\Pedagogie;

use App\Enums\JourDeLaSemaine;
use App\Http\Controllers\Controller;
use App\Http\Requests\seance\CreateSeanceRequest;
use App\Http\Requests\seance\UpdateSeanceRequest;
use App\Http\Resources\CoursResource;
use App\Http\Resources\HoraireResource;
use App\Http\Resources\NiveauResource;
use App\Http\Resources\ProfesseurResource;
use App\Http\Resources\SalleResource;
use App\Http\Resources\SeanceResource;
use App\Http\Resources\SemaineResource;
use App\Models\AnneeUniversitaire;
use App\Models\Cours;
use App\Models\Horaire;
use App\Models\Niveau;
use App\Models\Professeur;
use App\Models\Salle;
use App\Models\Seance;
use App\Models\Semaine;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeanceController extends Controller
{
    public function index(Request $request)
    {
        $salle = $request->query("salle");
        $niveau = $request->query("niveau");
        $professeur = $request->query("professeur");
        // $date = $request->query("date");

        try {
            // Filtrage dynamique des séances
            $seances = Seance::where("created_at", ">=", Carbon::now()->startOfWeek())
                ->when($salle, function ($query) use ($salle) {
                    $query->where("salle_id", $salle);
                })
                ->when($niveau, function ($query) use ($niveau) {
                    $query->where("niveau_id", $niveau);
                })
                ->when($professeur, function ($query) use ($professeur) {
                    $query->where("professeur_id", $professeur);
                })
                // ->when($date, function ($query) use ($date) {
                //     $query->where("date", $date);
                // })
                ->orderByDesc('date')
                ->get();


            return Inertia::render("seance/Index", [
                "seances" => SeanceResource::collection($seances),
                "professeurs" => ProfesseurResource::collection(Professeur::latest()->get()),
                "cours" => CoursResource::collection(Cours::latest()->get()),
                "salles" => SalleResource::collection(Salle::latest()->get()),
                "niveaux" => NiveauResource::collection(Niveau::latest()->get()),
                "semaines" => SemaineResource::collection(Semaine::latest()->get()),
                "horaires" => HoraireResource::collection(Horaire::latest()->get())
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function create()
    {
        $anneeActive = AnneeUniversitaire::where("estActive", 1)->first();

        return Inertia::render("seance/Create", [
            "professeurs" => ProfesseurResource::collection(Professeur::latest()->get()),
            "cours" => CoursResource::collection(Cours::latest()->get()),
            "salles" => SalleResource::collection(Salle::latest()->get()),
            "niveaux" => NiveauResource::collection(Niveau::latest()->get()),
            "semaines" => SemaineResource::collection(Semaine::where("annee_universitaire_id", $anneeActive->id)->latest()->get()),
            "horaires" => HoraireResource::collection(Horaire::latest()->get()),
            "joursDeLaSemaine" => JourDeLaSemaine::cases()
        ]);
    }
    public function store(CreateSeanceRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            // Recupere l'annee active
            $data["annee_universitaire_id"] = AnneeUniversitaire::where("estActive", 1)->first()->id;

            $horaire = Horaire::where("id", $data['horaire_id'])->first();

            $date = $data['date'];
            $salle = $data["salle_id"];
            $horaire = $data['horaire_id'];
            $professeur = $data['professeur_id'];

            // Nous verifions si la salle est occupée sur la plage horaire qu'on souhaite ajouté selon la date
            if (Seance::salleOccupee($salle, $date, $horaire)) {
                return response()->json([
                    "success" => false,
                    "message" => "Cette salle est occupée sur cette plage horaire"
                ]);
            }

            // Nous verifions si le professeur est occupé sur la plage horaire qu'on souhaite ajouté selon la date
            if (Seance::professeurOccupe($professeur, $date, $horaire)) {
                return response()->json([
                    "success" => false,
                    "message" => "Ce professeur est occupé sur cette plage horaire"
                ]);
            }

            //Creation d'une séance
            Seance::create($data);

            return response()->json(["success" => true]);
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
            $seances = Seance::when($salle, function ($query) use ($salle) {
                $query->where("salle_id", $salle);
            })
                ->when($niveau, function ($query) use ($niveau) {
                    $query->where("niveau_id", $niveau);
                })
                ->when($professeur, function ($query) use ($professeur) {
                    $query->where("professeur_id", $professeur);
                })
                ->when($date, function ($query) use ($date) {
                    $query->where("date", $date);
                })
                ->orderByDesc('date')->get();



            $pdf = Pdf::loadView('pdf.emploi', compact("seances"));

            return $pdf->download('Emploi_du_temps.pdf');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}

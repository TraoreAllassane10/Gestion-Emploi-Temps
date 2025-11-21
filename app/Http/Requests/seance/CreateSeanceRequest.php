<?php

namespace App\Http\Requests\seance;

use Illuminate\Foundation\Http\FormRequest;

class CreateSeanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "jours" => "required|string",
            "date" => "required",
            "heure_debut" => "required|before:heure_fin",
            "heure_fin" => "required|after:heure_debut",
            "cours_id" => "required",
            "professeur_id" => "required",
            "salle_id" => "required",
            "niveau_id" => "required",
        ];
    }

    public function messages()
    {
        return [
            "jours.required" => "Le jour est requis",
            "heure_debut.required" => "L'heure de debut est requise",
            "heure_fin.required" => "L'heure de fin est requise",
            "cours_id.required" => "Le cours est requis",
            "professeur_id.required" => "Le professeur est requis",
            "salle_id.required" => "Le salle est requis",
            "niveau_id.required" => "Le niveau est requis",
            "heure_debut.before" => "Veillez entrer une plage horaire valide",
            "heure_fin.after" => "Veillez entrer une plage horaire valide"
        ];
    }
}

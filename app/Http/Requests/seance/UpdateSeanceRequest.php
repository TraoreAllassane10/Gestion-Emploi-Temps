<?php

namespace App\Http\Requests\seance;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSeanceRequest extends FormRequest
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
            "jour" => "required|string",
            "date" => "required",
            "cours_id" => "required",
            "professeur_id" => "required",
            "salle_id" => "required",
            "niveau_id" => "required",
            "horaire_id" => "required",
            "semaine_id" => "required",
        ];
    }

    public function messages()
    {
        return [
            "jour.required" => "Le jour est requis",
            "cours_id.required" => "Le cours est requis",
            "professeur_id.required" => "Le professeur est requis",
            "salle_id.required" => "Le salle est requis",
            "horaire_id.required" => "L'horaire est requis",
            "semaine_id.required" => "La semaine est requise",
            "niveau_id.required" => "Le niveau est requis",
        ];
    }
}

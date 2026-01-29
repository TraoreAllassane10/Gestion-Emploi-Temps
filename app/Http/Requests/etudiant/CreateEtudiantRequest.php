<?php

namespace App\Http\Requests\etudiant;

use Illuminate\Foundation\Http\FormRequest;

class CreateEtudiantRequest extends FormRequest
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
            "ip" => "required|string|min:10|unique:etudiants,ip",
            "nom" => "required|string",
            "prenom" => "required|string",
            "date_naissance" => "required",
            "lieu_naissance" => "required|string",
            "numero" => "required|numeric",
            "nom_parent" => "required|string",
            "numero_parent" => "required|numeric",
            "niveau_id" => "required",
            "annee_id" => "required|exists:annee_scolaires,id"
        ];
    }

    public function messages(): array
    {
        return [
            'ip.required' => "L'identifiant (IP) est obligatoire.",
            'ip.string' => "L'identifiant (IP) doit être une chaîne de caractères.",
            'ip.min' => "L'identifiant (IP) doit contenir au moins :min caractères.",
            'ip.unique' => "L'identifiant (IP) déjà enregistré.",

            'nom.required' => "Le nom de l'étudiant est obligatoire.",
            'nom.string' => "Le nom doit être une chaîne de caractères.",

            'prenom.required' => "Le prénom de l'étudiant est obligatoire.",
            'prenom.string' => "Le prénom doit être une chaîne de caractères.",

            'date_naissane.required' => "La date de naissance est obligatoire.",

            'lieu_naissane.required' => "Le lieu de naissance est obligatoire.",
            'lieu_naissane.string' => "Le lieu de naissance doit être une chaîne de caractères.",

            'numero.required' => "Le numéro de téléphone de l'étudiant est obligatoire.",
            'numero.numeric' => "Le numéro de téléphone doit contenir uniquement des chiffres.",

            'nom_parent.required' => "Le nom du parent est obligatoire.",
            'nom_parent.string' => "Le nom du parent doit être une chaîne de caractères.",

            'numero_parent.required' => "Le numéro de téléphone du parent est obligatoire.",
            'numero_parent.numeric' => "Le numéro du parent doit contenir uniquement des chiffres.",
        ];
    }
}

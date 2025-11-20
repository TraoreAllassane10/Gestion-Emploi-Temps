<?php

namespace App\Http\Requests\professeur;

use Illuminate\Foundation\Http\FormRequest;

class CreateProfesseurRequest extends FormRequest
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
            "nom" => ["required", "string"],
            "prenom" => ["required", "string"],
            "email" => ["required", "email"],
            "telephone" => ["required", "string"]
        ];
    }

    public function messages()
    {
        return [
            "nom.required" => "Le nom est requis",
            "prenom.required" => "Le prenom est requis",
            "email.required" => "Le email est requis",
            "telephone.required" => "Le telephone est requis",
            "email.email" => "L'Email est incorrect"
        ];
    }
}

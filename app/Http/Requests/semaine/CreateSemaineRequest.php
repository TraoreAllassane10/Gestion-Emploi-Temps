<?php

namespace App\Http\Requests\semaine;

use Illuminate\Foundation\Http\FormRequest;

class CreateSemaineRequest extends FormRequest
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
            "libelle" => "required",
            "date_debut" => "required",
            "date_fin" => "required"
        ];
    }

    public function messages(): array
    {
        return [
            "libelle.required" => "Le libellé est obligatoire.",
            "date_debut.required" => "La date de début est obligatoire.",
            "date_fin.required" => "La date de fin est obligatoire."
        ];
    }
}

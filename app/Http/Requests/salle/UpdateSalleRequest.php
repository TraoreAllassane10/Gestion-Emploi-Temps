<?php

namespace App\Http\Requests\salle;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSalleRequest extends FormRequest
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
            "nom" => "required",
            "site_id" => "required|exists:sites,id"
        ];
    }

    public function messages()
    {
        return [
            "nom.required" => "Le nom de la salle est requise",
            "site_id" => "Veuillez sectionner un site",
            "site_id.exists" => "Ce site n'existe plus"
        ];
    }
}

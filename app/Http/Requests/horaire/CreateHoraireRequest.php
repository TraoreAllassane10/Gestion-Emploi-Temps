<?php

namespace App\Http\Requests\horaire;

use Illuminate\Foundation\Http\FormRequest;

class CreateHoraireRequest extends FormRequest
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
            "heure_debut" => "required",
            "heure_fin" => "required",
            "index_order" => "required",
        ];
    }

    public function messages(): array
    {
        return [
            'heure_debut.required' => 'L\'heure de début est obligatoire.',
            'heure_fin.required' => 'L\'heure de fin est obligatoire.',
            'index_order.required' => 'L\'index de l\'ordre est obligatoire.',
        ];
    }
}

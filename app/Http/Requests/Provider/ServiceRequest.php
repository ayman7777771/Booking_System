<?php

namespace App\Http\Requests\Provider;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom du service est obligatoire.',
            'nom.string'   => 'Le nom doit être une chaîne de caractères.',
            'nom.max'      => 'Le nom ne doit pas dépasser 255 caractères.',

            'prix.required' => 'Le prix est obligatoire.',
            'prix.numeric'  => 'Le prix doit être un nombre valide.',
            'prix.min'      => 'Le prix ne peut pas être négatif.',

            'duration.required' => 'La durée est obligatoire.',
            'duration.integer'  => 'La durée doit être un nombre entier.',
            'duration.min'      => 'La durée doit être au moins 1.',
        ];
    }
}
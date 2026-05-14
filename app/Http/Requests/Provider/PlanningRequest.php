<?php

namespace App\Http\Requests\Provider;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PlanningRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
       return [
        'day' => ['required'],
        'time' => ['required', 'array', 'min:1'],
    ];
    }
    public function messages(): array
    {
        return [
            'day.required' => 'Le jour est obligatoire.',
             'day.string' => 'Le jour doit être un texte valide.',
            'time.required' => 'Les horaires sont obligatoires.',
            'time.array' => 'Les horaires doivent être sous forme de liste.',
            'time.min' => 'Vous devez sélectionner au moins une heure.',

        ];
    }
}

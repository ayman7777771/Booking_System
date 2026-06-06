<?php

namespace App\Http\Requests\Provider;

use Illuminate\Foundation\Http\FormRequest;

class PlanningRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'provider';
    }

    public function rules(): array
    {
        return [
            'working_hours' => ['required', 'array'],
            'working_hours.lun' => ['nullable', 'array'],
            'working_hours.mar' => ['nullable', 'array'],
            'working_hours.mer' => ['nullable', 'array'],
            'working_hours.jeu' => ['nullable', 'array'],
            'working_hours.ven' => ['nullable', 'array'],
            'working_hours.sam' => ['nullable', 'array'],
            'working_hours.dim' => ['nullable', 'array'],
        ];
    }

    public function messages(): array
    {
        return [
            'working_hours.required' => 'Les horaires sont obligatoires.',
            'working_hours.array' => 'Les horaires doivent etre sous forme de liste.',
        ];
    }
}

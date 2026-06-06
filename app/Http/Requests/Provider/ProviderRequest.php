<?php

namespace App\Http\Requests\Provider;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProviderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'categorie_id' => 'required|exists:categories,id',
            'service' => 'required|string|min:3|max:255',
            'description' => 'nullable|string|min:10|max:2000',
            'main_photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'longitude' => 'nullable|numeric|between:-180,180',
            'latitude' => 'nullable|numeric|between:-90,90',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'categorie_id.required' => 'La categorie est obligatoire.',
            'categorie_id.exists' => 'La categorie selectionnee est invalide.',
            'service.required' => 'Le service est obligatoire.',
            'service.min' => 'Le service doit contenir au moins 3 caracteres.',
            'description.min' => 'La description doit contenir au moins 10 caracteres.',
            'main_photo.image' => 'Le fichier doit etre une image.',
            'main_photo.mimes' => 'Formats acceptes : jpg, jpeg, png, webp.',
            'main_photo.max' => "L'image ne doit pas depasser 2MB.",
            'longitude.numeric' => 'Longitude invalide.',
            'latitude.numeric' => 'Latitude invalide.',
        ];
    }
}

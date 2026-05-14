<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProviderRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => 'required|exists:categories,id',

            'service' => 'required|string|min:3|max:255',

            'description' => 'nullable|string|min:10|max:2000',

            'main_photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

            'longitude' => 'nullable|numeric|between:-180,180',

            'latitude' => 'nullable|numeric|between:-90,90',
        ];
    }
     public function messages(): array
    {
        return [
            'category_id.required' => 'La catégorie est obligatoire.',
            'category_id.exists' => 'La catégorie sélectionnée est invalide.',

            'service.required' => 'Le service est obligatoire.',
            'service.min' => 'Le service doit contenir au moins 3 caractères.',

            'description.min' => 'La description doit contenir au moins 10 caractères.',

            'main_photo.image' => 'Le fichier doit être une image.',
            'main_photo.mimes' => 'Formats acceptés : jpg, jpeg, png, webp.',
            'main_photo.max' => "L'image ne doit pas dépasser 2MB.",

            'longitude.numeric' => 'Longitude invalide.',
            'latitude.numeric' => 'Latitude invalide.',
        ];
    }
}


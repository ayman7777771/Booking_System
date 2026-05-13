<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class RegisterRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:90',
            'email' => 'required|string|email|max:155|unique:users,email',
            'ville_id' => 'required|exists:villes,id',

            'password' => [
                'required',
                'confirmed',
                'min:8',
            ],
            'password_confirmation' => 'required|string',

            'photo_profile' => 'required_if:role,provider|nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'tel' => 'required|string|max:13|unique:users,tel',
            'role' => 'required|in:client,provider',
            'main_photo' => 'required_if:role,provider|nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required_if:role,provider|nullable|integer|exists:categories,id',
            'description' => 'required_if:role,provider|nullable|string|min:20|max:2500',
            'service' => 'required_if:role,provider|nullable|string|min:3|max:150',
            'longitude' => 'required_if:role,provider|nullable|numeric|between:-180,180',
            'latitude' => 'required_if:role,provider|nullable|numeric|between:-90,90',
            'working_hours' => 'nullable|array',
            'working_hours.*' => 'array',
            'working_hours.*.*' => 'date_format:H:i',
        ];
    }

    public function messages(): array
    {
        return [
            // Step 1
            'name.required' => 'Le Nom est obligatoire',
            'name.min' => 'Min: 3 caractères',
            'name.max' => 'Max: 90 caractères',
            'name.regex' => 'Le nom ne doit pas contenir de chiffres ou de caractères spéciaux',
            'email.required' => "L'email est obligatoire",
            'email.email' => 'Email invalide',
            'email.unique' => 'Cet email est déjà utilisé',
            'email.max' => 'Max: 155 caractères',
            'tel.required' => 'Le numéro de téléphone est obligatoire',
            'tel.unique' => 'Ce numéro de téléphone est déjà utilisé',
            'tel.max' => 'Le numéro de téléphone est invalide',
            'ville_id.required' => 'La ville est obligatoire',
            'ville_id.exists' => 'La ville sélectionnée est invalide',
            'password.required' => 'Le mot de passe est obligatoire',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères',
            'password.confirmed' => 'Les mots de passe ne correspondent pas',

            'password_confirmation.required' => 'La confirmation est obligatoire',

            // Step 3
            'photo_profile.image' => 'Le fichier doit être une image',
            'photo_profile.mimes' => 'Format: JPEG, PNG, JPG, GIF',
            'photo_profile.max' => "L'image est trop volumineuse (max 2 Mo)",


            'role.required' => 'Le rôle est obligatoire',
            'role.in' => 'Le rôle est invalide',
            // Step 4
            'main_photo.required_if' => "L'image de couverture est obligatoire",
            'main_photo.image' => 'Le fichier doit être une image',
            'main_photo.mimes' => 'Format: JPEG, PNG, JPG, GIF',
            'main_photo.max' => "L'image est trop volumineuse (max 2 Mo)",

            // Step 5 
            'category_id.required_if' => 'Veuillez choisir une catégorie',
            'category_id.exists' => 'La catégorie sélectionnée est invalide',

            'description.required_if' => 'La description est obligatoire',
            'description.min' => 'La description doit contenir au moins 20 caractères',
            'description.max' => 'Max: 2000 caractères',

            'service.required_if' => 'Le Nom de Service est obligatoire',
            'service.min' => 'Min 3 caractères',
            'service.max' => 'Max: 500 caractères',
            'service.regex' => 'Les chiffres ne sont pas autorisés',

            // Step 6
            'longitude.required_if' => 'Veuillez sélectionner un emplacement sur la carte',
            'longitude.numeric' => 'Format invalide',
            'longitude.between' => 'Longitude invalide',

            'latitude.required_if' => 'Veuillez sélectionner un emplacement sur la carte',
            'latitude.numeric' => 'Format invalide',
            'latitude.between' => 'Latitude invalide',
            'working_hours.*.day' => 'Jour de fonctionnement invalide',
            'working_hours.*.time' => 'Heure de fonctionnement invalide',
        ];
    }
    


    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim($this->name),
            'email' => strtolower(trim($this->email)),
            'service' => trim($this->service ?? ''),
            'description' => trim($this->description ?? ''),
        ]);

        if ($this->longitude) {
            $this->merge(['longitude' => (float) $this->longitude]);
        }
        if ($this->latitude) {
            $this->merge(['latitude' => (float) $this->latitude]);
        }
    }

}
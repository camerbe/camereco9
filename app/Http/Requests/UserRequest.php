<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            //
            'nom'=>'required',
            'prenom'=>'required',
            'email'=>'required|email',
            'password'=>'required|min:8',

        ];
    }
    public function messages()
    {
        return [
            'nom.required' => 'Le nom est requis',
            'prenom.required' => 'Le prénom est requis',
            'email.required' => 'Le mail est requis',
            'email.email' => "Le mail n'est pas valide",
            'password.required' => 'Le mot de passe est requis',
            'password.min' => 'Le mot de passe doit avoir une longueur minimum de 8',
            //'password.letters' => 'Le mot de passe doit contenir des lettres',
            //'password.mixedCase' => 'Le mot de passe doit contenir une lettre majuscule',
            //'password.numbers' => 'Le mot de passe doit contenir un chiffre',
            //'password.symbols' => 'Le mot de passe doit contenir un caractère spécial',



        ];
    }
}

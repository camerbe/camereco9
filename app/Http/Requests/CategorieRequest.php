<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategorieRequest extends FormRequest
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
            "categorie"=>"required",
            "rubrique_id"=>"required",
        ];

    }
    public function messages()
    {
        return [
            'categorie.required' => 'La catégorie est requise',
            'rubrique_id.required' => 'La rubrique est requise',
        ];
    }
}

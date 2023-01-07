<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RubriqueRequest extends FormRequest
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
            "rubrique"=>"required",

        ];
    }
    public function messages()
    {
        return [
            'rubrique.required' => 'La rubrique est requise',

        ];
    }
}

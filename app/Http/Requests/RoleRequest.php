<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
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
            "role"=>"required",
            "shortrole"=>"required|max:4",
        ];
    }
    public function messages()
    {
        return [
            'role.required' => 'Le rôle est requis',
            'shortrole.required' => 'Le shortrole est requis',
            'shortrole.max' => 'Le nombre de caractères doit < 4',



        ];
    }
}

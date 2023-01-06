<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PubRequest extends FormRequest
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
            'datefinpub'=>'required|date',
            'photo'=>'required',
            'pub_dimension_id'=>'required',

        ];
    }
    public function messages()
    {
        return [
            'datefinpub.required' => 'La date est requise',
            'photo.required' => 'La photo est requise',
            'pub_dimension_id.required' => 'La dimension est requise',

        ];
    }
}

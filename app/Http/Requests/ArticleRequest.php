<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
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
            "auteur"=>"required",
            "source"=>"required",
            "titre"=>"required",
            //"chapeau"=>"required",
            //"slug"=>"required",
            "user_id"=>"required",
            "pays_code"=>"required",
            "categorie_id"=>"required",
            "photo"=>"required",
            "dateparution"=>"required",
            "article"=>"required",
        ];
    }
}

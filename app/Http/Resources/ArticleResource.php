<?php

namespace App\Http\Resources;

use App\Models\Categorie;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $rubriques=Categorie::findOrFail($this->id);
        $rub = $rubriques->rubrique->rubrique;

        //dd($this->rub.' '.$rub);
        return [
            'id'=>$this->id,
            'auteur'=>$this->auteur,
            'source'=>$this->source,
            'titre'=>$this->titre,
            'chapeau'=>$this->chapeau,
            'slug'=>$this->slug,
            'article'=>$this->titre,
            'user_id '=>$this->user_id,
            'pays_code '=>$this->pays_code,
            'categorie_id  '=>$this->categorie_id,
            'rubrique'=>$rub,
            'categorie'=>$rubriques->categorie,
            'photo'=>$this->photo,
            'dateparution  '=>$this->dateparution,
            'article  '=>$this->article,
            'createdBy'=>$this->createdBy,
            'lastmodifiedBy'=>$this->lastmodifiedBy,

        ];
    }
}

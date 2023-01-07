<?php

namespace App\Http\Resources;

use App\Models\Categorie;
use Illuminate\Http\Resources\Json\JsonResource;

class CategorieResource extends JsonResource
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
            'categorie'=>$this->categorie,
            'slug'=>$this->slug,
            'rubrique_id'=>$this->rubrique_id,
            'rubrique'=>$rub,
            'createdBy'=>$this->createdBy,
            'lastmodifiedBy'=>$this->lastmodifiedBy,

        ];
    }
}

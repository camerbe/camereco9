<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RubriqueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'rubrique'=>$this->rubrique,
            //'categories'=> new CategorieResource($this->id),
            'createdBy'=>$this->createdBy,
            'lastmodifiedBy'=>$this->lastmodifiedBy,

        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\DimensionResource;
class PubResource extends JsonResource
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
            'datefinpub'=>$this->datefinpub,
            'lien'=>$this->lien,
            'editeur'=>$this->editeur,
            'photo'=>$this->photo,
            'pub_dimension_id'=>$this->pub_dimension_id,
            'createdBy'=>$this->createdBy,
            'lastmodifiedBy'=>$this->lastmodifiedBy,
        ];
    }
}

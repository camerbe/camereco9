<?php

namespace App\Http\Resources;

use App\Models\Categorie;
use App\Http\Resources\CategorieResource;
use App\Models\Rubrique;
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
        $categories = Rubrique::find($this->id)->categories();
        //dd($rubrique);
        return [
            'id'=>$this->id,
            'rubrique'=>$this->rubrique,
            'categories'=> CategorieResource::collection($this->categories),
            'createdBy'=>$this->createdBy,
            'lastmodifiedBy'=>$this->lastmodifiedBy,


        ];
    }
    // public function relationships($request): iterable
    // {
    //     return [
    //         $this->relation('categorie','rubrique'),
    //        // $this->relation('comments'),
    //        // $this->relation('tags'),
    //     ];
    // }

}

<?php

namespace App\Http\Resources;


use App\Models\Article;
use App\Models\Categorie;
use App\Models\Pays;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ArticleCollection;

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
        $rubriques=Categorie::findOrFail($this->categorie_id);
        $rub = $rubriques->rubrique->rubrique;
        //
        $bled = Pays::where('code',$this->pays_code)->first();
        $tags = $this->tags()->get();
        //dd($tags.' '.$bled);

        return [
            'id'=>$this->id,
            'hit'=>$this->hit,
            'auteur'=>$this->auteur,
            'source'=>$this->source,
            'titre'=>$this->titre,
            'chapeau'=>$this->chapeau,
            'slug'=>$this->slug,
            'article'=>$this->titre,
            'user_id'=>$this->user_id,
            'pays_code'=>$this->pays_code,
            'pays'=>$bled->pays ,
            'country'=>$bled->country ,
            'categorie_id'=>$this->categorie_id,
            'rubrique'=>$rub,
            'categorie'=>$rubriques->categorie,
            'photo'=>$this->photo,
            'dateparution  '=>$this->dateparution,
            'article  '=>$this->article,
            'createdBy'=>$this->createdBy,
            'lastmodifiedBy'=>$this->lastmodifiedBy,
            'tags'=>  TagResource::collection($tags),

        ];
    }
}

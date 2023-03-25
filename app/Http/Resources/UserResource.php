<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'nom'=>$this->nom,
            'prenom'=>$this->prenom,
            'fullname'=>$this->nom. ' '.$this->prenom,
            'email'=>$this->email ,
            'email_verified_at'=>$this->email_verified_at,
            'suspended'=>$this->suspended,
            'createdBy'=>$this->createdBy,
            'lastmodifiedBy'=>$this->lastmodifiedBy,
            'roles'=>RoleResource::Collection($this->roles)
        ];
    }
}

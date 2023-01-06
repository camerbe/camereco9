<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pub extends Model
{
    use HasFactory;
    protected $fillable = [
        'datefinpub',
        'lien',
        'editeur',
        'photo',
        'createdBy',
        'lastmodifiedBy',
        'pub_dimension_id',

    ];
    public function dimensions()
    {
        return $this->hasMany(PubDimension::class);
    }
}

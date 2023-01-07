<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rubrique extends Model
{
    use HasFactory;
    protected $fillable = [
        'rubrique',
        'slug',
        'createdBy',
        'lastmodifiedBy',

    ];
    public function categories()
    {
        return $this->hasMany(Categorie::class);

    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;
    protected $fillable = [
        'categorie',
        'slug',
        'rubrique_id',
        'createdBy',
        'lastmodifiedBy',

    ];
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
    // public function rubriques()
    // {
    //     return $this->hasMany(Rubrique::class);
    // }
    public function rubrique()
    {
        return $this->belongsTo(Rubrique::class);
    }
}

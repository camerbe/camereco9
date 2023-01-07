<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    protected $fillable = [
        'auteur',
        'source',
        'titre',
        'chapeau',
        'slug',
        'user_id',
        'pays_code',
        'categorie_id',
        'photo',
        'dateparution',
        'article',
        'createdBy',
        'lastmodifiedBy',

    ];
    public function categorie()
    {
        return $this->hasMany(Categorie::class);
    }
    public function user()
    {
        return $this->hasMany(User::class);
    }
    public function countries()
    {
        return $this->hasMany(Pays::class);
    }
}

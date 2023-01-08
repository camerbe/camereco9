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
        return $this->belongsTo(Categorie::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function countries()
    {
        return $this->belongsTo(Pays::class);
    }
    public function tags(){
        return $this->belongsToMany(Tag::class,'article_tag');
    }
}

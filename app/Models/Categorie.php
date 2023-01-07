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
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
    public function rubrique()
    {
        return $this->hasMany(Rubrique::class);
    }
}

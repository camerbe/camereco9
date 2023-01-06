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
        'createdBy',
        'lastmodifiedBy',

    ];
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}

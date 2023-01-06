<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;
    protected $fillable = [
        'tag',
        'slug',
        'createdBy',
        'lastmodifiedBy',

    ];
    public function articles(){
        return $this->belongsToMany(Article::class,'user_role');
    }
}


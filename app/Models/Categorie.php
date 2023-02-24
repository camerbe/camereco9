<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

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
    protected static function boot(){
        parent::boot();
        Categorie::created(function($model){
            Cache::forget('categorie-list');
        });
        Categorie::deleted(function($model){
            Cache::forget('categorie-list');
        });
        Categorie::updated(function($model){
            Cache::forget('categorie-list');
        });
    }
    public function rubrique()
    {
        return $this->belongsTo(Rubrique::class);
    }

}

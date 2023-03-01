<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

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
    protected static function boot(){
        parent::boot();
        Rubrique::created(function($model){
            Cache::forget('rubrique-list');
        });
        Rubrique::deleted(function($model){
            Cache::forget('rubrique-list');
        });
        Rubrique::updated(function($model){
            Cache::forget('rubrique-list');
        });
    }
}

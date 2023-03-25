<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

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
        return $this->belongsToMany(Article::class,'article_tag');
    }
    protected static function boot(){
        parent::boot();
        Tag::created(function($model){
            Cache::forget('tag-list');
        });
        Tag::deleted(function($model){
            Cache::forget('tag-list');
        });
        Tag::updated(function($model){
            Cache::forget('tag-list');
        });
    }
}


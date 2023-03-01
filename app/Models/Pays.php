<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Pays extends Model
{
    use HasFactory;
    protected $primaryKey = 'code';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'code',
        'pays',
        'country',
        'createdBy',
        'lastmodifiedBy',

    ];
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
    protected static function boot(){
        parent::boot();
        Pays::created(function($model){
            Cache::forget('pays-list');
        });
        Pays::deleted(function($model){
            Cache::forget('pays-list');
        });
        Pays::updated(function($model){
            Cache::forget('pays-list');
        });
    }
}

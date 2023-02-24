<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Role extends Model
{
    use HasFactory;
    protected $fillable = [
        'role',
        'slug',
        'shortrole',
        'createdBy',
        'lastmodifiedBy',

    ];

    public function users(){
        return $this->belongsToMany(User::class,'user_role');
    }
    protected static function boot(){
        parent::boot();
        Role::created(function($model){
            Cache::forget('role-list');
        });
        Categorie::deleted(function($model){
            Cache::forget('role-list');
        });
        Categorie::updated(function($model){
            Cache::forget('role-list');
        });
    }
}

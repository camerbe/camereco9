<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pays extends Model
{
    use HasFactory;
    protected $fillable = [
        'code ',
        'pays',
        'country',
        'createdBy',
        'lastmodifiedBy',

    ];
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}

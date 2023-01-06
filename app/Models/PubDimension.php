<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PubDimension extends Model
{
    use HasFactory;
    protected $fillable = [
        'dimension',
        'createdBy',
        'lastmodifiedBy',

    ];
    public function pub()
    {
        return $this->belongsTo(Pub::class);
    }
}

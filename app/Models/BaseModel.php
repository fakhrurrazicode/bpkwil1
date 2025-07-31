<?php

// app/Models/BaseModel.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

abstract class BaseModel extends Model
{
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->translatedFormat('d F Y H:i:s');
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->translatedFormat('d F Y H:i:s');
    }
}

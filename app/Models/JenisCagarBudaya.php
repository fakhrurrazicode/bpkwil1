<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JenisCagarBudaya extends Model
{
    use SoftDeletes;
    protected $table = 'jenis_cagar_budaya';
    protected $guarded = [];
}

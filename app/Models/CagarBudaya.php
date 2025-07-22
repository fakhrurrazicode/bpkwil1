<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CagarBudaya extends Model
{
    protected $table = 'cagar_budaya';
    protected $guarded = [];

    public function jenis_cagar_budaya()
    {
        return $this->belongsTo(JenisCagarBudaya::class);
    }
}

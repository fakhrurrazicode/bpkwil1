<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CagarBudaya extends BaseModel
{
    protected $table = 'cagar_budaya';
    protected $guarded = [];

    public function jenis_cagar_budaya()
    {
        return $this->belongsTo(JenisCagarBudaya::class);
    }

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }
}

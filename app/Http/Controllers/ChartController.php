<?php

namespace App\Http\Controllers;

use App\Models\JenisCagarBudaya;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    public function jenis_cagar_budaya()
    {
        $query = JenisCagarBudaya::query();
        $jenis_cagar_budaya = $query->get();
        return $jenis_cagar_budaya;
    }
}

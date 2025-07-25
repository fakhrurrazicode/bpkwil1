<?php

namespace App\Http\Controllers;

use Laravolt\Indonesia\Models\Province;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Village;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    public function getProvinces()
    {
        return Province::all();
    }

    public function getCities($provinceId)
    {
        return City::where('province_id', $provinceId)->get();
    }

    public function getDistricts($cityId)
    {
        return District::where('city_id', $cityId)->get();
    }

    public function getVillages($districtId)
    {
        return Village::where('district_id', $districtId)->get();
    }
}

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

    public function getCities($province_code)
    {
        return City::where('province_code', $province_code)->get();
    }

    public function getDistricts($city_code)
    {
        return District::where('city_code', $city_code)->get();
    }

    public function getVillages($district_code)
    {
        return Village::where('district_code', $district_code)->get();
    }
}

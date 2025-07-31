<?php

namespace App\Http\Controllers;

use App\Http\Requests\CagarBudayaStoreRequest;
use App\Http\Requests\CagarBudayaUpdateRequest;
use App\Models\CagarBudaya;
use App\Models\JenisCagarBudaya;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CagarBudayaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = CagarBudaya::query();

        if ($search = $request->search) {
            $query->where('cagar_budaya.nama', 'like', "%$search%");
            $query->orWhere('jenis_cagar_budaya.nama', 'like', "%$search%");
        }

        if ($sort = $request->sort) {
            $direction = $request->direction === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sort, $direction);
        }

        $query->with([
            'jenis_cagar_budaya'
        ]);

        $query->join('jenis_cagar_budaya', 'cagar_budaya.jenis_cagar_budaya_id', '=', 'jenis_cagar_budaya.id');
        $query->select('cagar_budaya.*', 'jenis_cagar_budaya.nama as nama_jenis_cagar_budaya');

        $cagar_budayas = $query->paginate(10)->withQueryString();

        $jenis_cagar_budayas = JenisCagarBudaya::withCount('cagar_budaya')->get();

        return Inertia::render('CagarBudaya/Index', [
            'cagar_budayas' => $cagar_budayas,
            'jenis_cagar_budayas' => $jenis_cagar_budayas,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $jenis_cagar_budayas = JenisCagarBudaya::all();
        return Inertia::render('CagarBudaya/Create', [
            'jenis_cagar_budayas' => $jenis_cagar_budayas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CagarBudayaStoreRequest $request)
    {
        CagarBudaya::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(CagarBudaya $cagar_budaya)
    {
        $cagar_budaya->load(['jenis_cagar_budaya']);
        return Inertia::render('CagarBudaya/Show', [
            'cagar_budaya' => $cagar_budaya
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CagarBudaya $cagar_budaya)
    {
        $jenis_cagar_budayas = JenisCagarBudaya::all();
        return Inertia::render('CagarBudaya/Edit', [
            'jenis_cagar_budayas' => $jenis_cagar_budayas,
            'cagar_budaya' => $cagar_budaya
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CagarBudayaUpdateRequest $request, CagarBudaya $cagar_budaya)
    {
        $cagar_budaya->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CagarBudaya $cagar_budaya)
    {
        $cagar_budaya->delete();
    }
}

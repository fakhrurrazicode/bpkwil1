<?php

namespace App\Http\Controllers;

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
            $query->where('nama', 'like', "%$search%");
        }

        if ($sort = $request->sort) {
            $direction = $request->direction === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sort, $direction);
        }

        $query->with([
            'jenis_cagar_budaya'
        ]);
        $cagar_budayas = $query->paginate(10)->withQueryString();

        return Inertia::render('CagarBudaya/Index', [
            'cagar_budayas' => $cagar_budayas,
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenis_cagar_budaya_id' => ['required', 'exists:jenis_cagar_budaya,id'],
            'nama' => [
                'required',
                'string',
                'unique:cagar_budaya,nama'
            ],
            'deskripsi' => ['required', 'string'],

        ]);

        CagarBudaya::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(CagarBudaya $cagar_budaya)
    {

        // return Inertia::render('CagarBudaya/Edit', [
        //     'cagar_budaya' => $cagar_budaya
        // ]);
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
    public function update(Request $request, CagarBudaya $cagar_budaya)
    {
        $validated = $request->validate([
            'nama' => [
                'required',
                'string',
                'unique:cagar_budaya,nama,' . $cagar_budaya->id,
            ],
            'deskripsi' => ['required', 'string'],
        ]);

        $cagar_budaya->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CagarBudaya $cagar_budaya)
    {
        $cagar_budaya->delete();
    }
}

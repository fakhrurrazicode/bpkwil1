<?php

namespace App\Http\Controllers;

use App\Models\JenisCagarBudaya;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JenisCagarBudayaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = JenisCagarBudaya::query();

        if ($search = $request->search) {
            $query->where('nama', 'like', "%$search%");
        }

        if ($sort = $request->sort) {
            $direction = $request->direction === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sort, $direction);
        }

        $jenis_cagar_budayas = $query->paginate(10)->withQueryString();

        return Inertia::render('JenisCagarBudaya/Index', [
            'jenis_cagar_budayas' => $jenis_cagar_budayas,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('JenisCagarBudaya/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => [
                'required',
                'string',
                'unique:jenis_cagar_budaya,nama'
            ],
            'deskripsi' => ['required', 'string'],
        ]);

        JenisCagarBudaya::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(JenisCagarBudaya $jenis_cagar_budaya)
    {

        // return Inertia::render('JenisCagarBudaya/Edit', [
        //     'jenis_cagar_budaya' => $jenis_cagar_budaya
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JenisCagarBudaya $jenis_cagar_budaya)
    {
        return Inertia::render('JenisCagarBudaya/Edit', [
            'jenis_cagar_budaya' => $jenis_cagar_budaya
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JenisCagarBudaya $jenis_cagar_budaya)
    {
        $validated = $request->validate([
            'nama' => [
                'required',
                'string',
                'unique:jenis_cagar_budaya,nama,' . $jenis_cagar_budaya->id,
            ],
            'deskripsi' => ['required', 'string'],
        ]);

        $jenis_cagar_budaya->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JenisCagarBudaya $jenis_cagar_budaya)
    {
        $jenis_cagar_budaya->delete();
    }
}

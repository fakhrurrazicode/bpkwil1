<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CagarBudayaUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        $cagar_budaya = $this->route('cagar_budaya');

        return [
            'jenis_cagar_budaya_id' => ['required', 'exists:jenis_cagar_budaya,id'],
            'nama' => [
                'required',
                'string',
                'unique:cagar_budaya,nama,' . $cagar_budaya->id,
            ],
            "sifat" => ['required'],
            "kode_provinsi" => ['required'],
            "kode_kabupaten" => ['required'],
            "kode_kecamatan" => ['required'],
            "kode_desa" => ['required'],
            "alamat" => ['required'],
            // "latitude" => ['required'],
            // "longitude" => ['required'],
            // "elevasi" => ['required'],
            "periode" => ['required'],
            'deskripsi' => ['required'],
        ];
    }
}

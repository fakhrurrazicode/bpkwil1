<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CagarBudayaStoreRequest extends FormRequest
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
        return [
            'jenis_cagar_budaya_id' => ['required', 'exists:jenis_cagar_budaya,id'],
            'nama' => [
                'required',
                'string',
                'unique:cagar_budaya,nama'
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

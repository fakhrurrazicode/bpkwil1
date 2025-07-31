import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";

export default function Create({ cagar_budaya }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Perbaharui Cagar Budaya
                </h2>
            }
        >
            <Head title="Perbaharui Cagar Budaya" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="card bg-base-100 mb-6">
                        <div className="card-body">
                            <h4 className="text-sm mb-2">
                                {cagar_budaya.jenis_cagar_budaya.nama}
                            </h4>
                            <h1 className="text-xl font-semibold">
                                {cagar_budaya.nama}
                            </h1>
                        </div>
                    </div>

                    <div role="tablist" className="tabs tabs-lift">
                        <a role="tab" className="tab tab-active">
                            Informasi Detail CB
                        </a>
                        <a role="tab" className="tab">
                            File Terkait
                        </a>
                    </div>
                    <div className="card bg-base-100 mb-6 rounded-t-none">
                        <div className="card-body">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th className="text-right w-1/4">
                                                Nama
                                            </th>
                                            <td>{cagar_budaya.nama}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                Jenis Cagar Budaya
                                            </th>
                                            <td>
                                                {
                                                    cagar_budaya
                                                        .jenis_cagar_budaya.nama
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                Sifat
                                            </th>
                                            <td>{cagar_budaya.sifat}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                kode_provinsi
                                            </th>
                                            <td>
                                                {cagar_budaya.kode_provinsi}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                kode_kabupaten
                                            </th>
                                            <td>
                                                {cagar_budaya.kode_kabupaten}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                kode_kecamatan
                                            </th>
                                            <td>
                                                {cagar_budaya.kode_kecamatan}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                kode_desa
                                            </th>
                                            <td>{cagar_budaya.kode_desa}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                Alamat
                                            </th>
                                            <td>{cagar_budaya.alamat}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                Latitude
                                            </th>
                                            <td>{cagar_budaya.latitude}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                Longitude
                                            </th>
                                            <td>{cagar_budaya.longitude}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                Elevasi
                                            </th>
                                            <td>{cagar_budaya.elevasi}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                Periode
                                            </th>
                                            <td>{cagar_budaya.periode}</td>
                                        </tr>

                                        <tr>
                                            <th className="text-right">
                                                keutuhan
                                            </th>
                                            <td>{cagar_budaya.keutuhan}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                pemeliharaan
                                            </th>
                                            <td>{cagar_budaya.pemeliharaan}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                pemugaran
                                            </th>
                                            <td>{cagar_budaya.pemugaran}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                adaptasi
                                            </th>
                                            <td>{cagar_budaya.adaptasi}</td>
                                        </tr>

                                        <tr>
                                            <th className="text-right">
                                                status_kepemilikan
                                            </th>
                                            <td>
                                                {
                                                    cagar_budaya.status_kepemilikan
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                nama_pemilik
                                            </th>
                                            <td>{cagar_budaya.nama_pemilik}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                kode_provinsi_pemilik
                                            </th>
                                            <td>
                                                {
                                                    cagar_budaya.kode_provinsi_pemilik
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                kode_kabupaten_pemilik
                                            </th>
                                            <td>
                                                {
                                                    cagar_budaya.kode_kabupaten_pemilik
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                kode_kecamatan_pemilik
                                            </th>
                                            <td>
                                                {
                                                    cagar_budaya.kode_kecamatan_pemilik
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                kode_desa_pemilik
                                            </th>
                                            <td>
                                                {cagar_budaya.kode_desa_pemilik}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                alamat_pemilik
                                            </th>
                                            <td>
                                                {cagar_budaya.alamat_pemilik}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                latitude_pemilik
                                            </th>
                                            <td>
                                                {cagar_budaya.latitude_pemilik}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                longitude_pemilik
                                            </th>
                                            <td>
                                                {cagar_budaya.longitude_pemilik}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-right">
                                                perolehan
                                            </th>
                                            <td>{cagar_budaya.perolehan}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

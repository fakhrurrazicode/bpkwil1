import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { FiEdit, FiList, FiPlus, FiTrash } from "react-icons/fi";
import { FaFileExcel, FaFilePdf, FaFileAlt } from "react-icons/fa";

export default function Index({ cagar_budayas, jenis_cagar_budayas, filters }) {
    const debouncedSearch = useCallback(
        debounce((value) => {
            router.get(
                route("cagar_budaya.index"),
                { ...filters, search: value },
                { preserveScroll: true, preserveState: true }
            );
        }, 500), // 500ms delay
        [filters]
    );
    const onSearch = (e) => {
        debouncedSearch(e.target.value);
    };

    const onSort = (field) => {
        let direction = filters.direction === "asc" ? "desc" : "asc";
        router.get(
            route("cagar_budaya.index"),
            { ...filters, sort: field, direction },
            { preserveScroll: true }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Cagar Budaya
                </h2>
            }
        >
            <Head title="Cagar Budaya" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <div className="stats shadow w-full">
                            {jenis_cagar_budayas.map((jenis_cagar_budaya) => (
                                <div
                                    className="stat"
                                    key={jenis_cagar_budaya.id}
                                >
                                    <div className="stat-figure text-primary">
                                        {/* <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="inline-block h-8 w-8 stroke-current"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            ></path>
                                        </svg> */}
                                        <FaFileAlt size={36} />
                                    </div>
                                    <div className="stat-title font-bold">
                                        {jenis_cagar_budaya.nama}
                                    </div>
                                    <div className="stat-value text-primary">
                                        {jenis_cagar_budaya.cagar_budaya_count}
                                    </div>
                                    {/* <div className="stat-desc">
                                        21% more than last month
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    defaultValue={filters.search}
                                    onChange={onSearch}
                                    className="input input-bordered"
                                />
                                <div className="flex gap-1">
                                    <Link
                                        href={route("cagar_budaya.create")}
                                        className="btn btn-primary"
                                        preserveScroll={true}
                                        preserveState={true}
                                    >
                                        <FiPlus />
                                        Tambah
                                    </Link>
                                    <Link
                                        href={route("cagar_budaya.create")}
                                        className="btn btn-success"
                                        preserveScroll={true}
                                        preserveState={true}
                                    >
                                        <FaFileExcel />
                                        Export Excel
                                    </Link>
                                    <Link
                                        href={route("cagar_budaya.create")}
                                        className="btn btn-secondary"
                                        preserveScroll={true}
                                        preserveState={true}
                                    >
                                        <FaFilePdf />
                                        Export PDF
                                    </Link>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th
                                                onClick={() =>
                                                    onSort("cagar_budaya.nama")
                                                }
                                                className="cursor-pointer"
                                            >
                                                Nama
                                            </th>
                                            <th
                                                onClick={() =>
                                                    onSort(
                                                        "jenis_cagar_budaya.nama"
                                                    )
                                                }
                                                className="cursor-pointer"
                                            >
                                                Jenis Cagar Budaya
                                            </th>

                                            <th
                                                onClick={() =>
                                                    onSort("deskripsi")
                                                }
                                                className="cursor-pointer"
                                            >
                                                Deskripsi
                                            </th>
                                            <th>Jumlah File</th>
                                            <th>diinput pada</th>
                                            <th>diupdated pada</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cagar_budayas.data.map(
                                            (cagar_budaya, i) => (
                                                <tr key={cagar_budaya.id}>
                                                    <td>
                                                        {cagar_budayas.from + i}
                                                    </td>
                                                    <td>{cagar_budaya.nama}</td>
                                                    <td>
                                                        {
                                                            cagar_budaya.nama_jenis_cagar_budaya
                                                        }
                                                    </td>
                                                    <td>
                                                        {cagar_budaya.deskripsi
                                                            ? cagar_budaya.deskripsi.slice(
                                                                  0,
                                                                  100
                                                              )
                                                            : "-"}
                                                    </td>
                                                    <td>0</td>
                                                    <td>
                                                        {
                                                            cagar_budaya.created_at
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            cagar_budaya.updated_at
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-1">
                                                            {/* <Link
                                                                href={route(
                                                                    "cagar_budaya.edit",
                                                                    {
                                                                        cagar_budaya:
                                                                            cagar_budaya.id,
                                                                    }
                                                                )}
                                                                className="btn btn-sm btn-secondary"
                                                            >
                                                                <FiEdit />
                                                                Upload File
                                                                Terkait
                                                            </Link> */}
                                                            <Link
                                                                href={route(
                                                                    "cagar_budaya.show",
                                                                    {
                                                                        cagar_budaya:
                                                                            cagar_budaya.id,
                                                                    }
                                                                )}
                                                                className="btn btn-sm btn-secondary"
                                                            >
                                                                <FiList />
                                                                Detail
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "cagar_budaya.edit",
                                                                    {
                                                                        cagar_budaya:
                                                                            cagar_budaya.id,
                                                                    }
                                                                )}
                                                                className="btn btn-sm btn-primary"
                                                            >
                                                                <FiEdit />
                                                                Ubah
                                                            </Link>
                                                            <button
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    const confirmation =
                                                                        confirm(
                                                                            "Anda yakin ingin menghapus data cagar budaya " +
                                                                                cagar_budaya.nama +
                                                                                "?"
                                                                        );

                                                                    if (
                                                                        confirmation
                                                                    ) {
                                                                        router.delete(
                                                                            route(
                                                                                "cagar_budaya.destroy",
                                                                                {
                                                                                    cagar_budaya:
                                                                                        cagar_budaya.id,
                                                                                }
                                                                            ),
                                                                            {
                                                                                preserveScroll: true,
                                                                                preserveState: true,
                                                                            }
                                                                        );
                                                                    }
                                                                }}
                                                                className="btn btn-sm btn-error text-white"
                                                            >
                                                                <FiTrash />
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4">
                                {cagar_budayas.links.map((link) => (
                                    <button
                                        key={link.label}
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url && router.visit(link.url)
                                        }
                                        className={`btn btn-sm mx-1 ${
                                            link.active
                                                ? "btn-primary"
                                                : "btn-outline"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

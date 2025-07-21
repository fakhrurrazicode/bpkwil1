import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";

export default function Index({ jenis_cagar_budayas, filters }) {
    const debouncedSearch = useCallback(
        debounce((value) => {
            router.get(
                route("jenis_cagar_budaya.index"),
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
            route("jenis_cagar_budaya.index"),
            { ...filters, sort: field, direction },
            { preserveScroll: true }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Jenis Cagar Budaya
                </h2>
            }
        >
            <Head title="Jenis Cagar Budaya" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                                <Link
                                    href={route("jenis_cagar_budaya.create")}
                                    className="btn btn-primary"
                                    preserveScroll={true}
                                    preserveState={true}
                                >
                                    <FiPlus />
                                    Tambah
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th
                                                onClick={() => onSort("nama")}
                                                className="cursor-pointer"
                                            >
                                                Nama
                                            </th>
                                            <th
                                                onClick={() =>
                                                    onSort("deskripsi")
                                                }
                                                className="cursor-pointer"
                                            >
                                                Deskripsi
                                            </th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jenis_cagar_budayas.data.map(
                                            (jenis_cagar_budaya, i) => (
                                                <tr key={jenis_cagar_budaya.id}>
                                                    <td>
                                                        {jenis_cagar_budayas.from +
                                                            i}
                                                    </td>
                                                    <td>
                                                        {
                                                            jenis_cagar_budaya.nama
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            jenis_cagar_budaya.deskripsi
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-1">
                                                            <Link
                                                                href={route(
                                                                    "jenis_cagar_budaya.edit",
                                                                    {
                                                                        jenis_cagar_budaya:
                                                                            jenis_cagar_budaya.id,
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
                                                                            "Anda yakin ingin menghapus data jenis cagar budaya " +
                                                                                jenis_cagar_budaya.nama +
                                                                                "?"
                                                                        );

                                                                    if (
                                                                        confirmation
                                                                    ) {
                                                                        router.delete(
                                                                            route(
                                                                                "jenis_cagar_budaya.destroy",
                                                                                {
                                                                                    jenis_cagar_budaya:
                                                                                        jenis_cagar_budaya.id,
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
                                {jenis_cagar_budayas.links.map((link) => (
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

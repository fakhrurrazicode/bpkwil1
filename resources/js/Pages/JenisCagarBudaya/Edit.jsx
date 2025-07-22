import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { FiSave } from "react-icons/fi";

export default function Edit({ jenis_cagar_budaya }) {
    const { data, setData, put, processing, progress, errors } = useForm({
        nama: jenis_cagar_budaya.nama,
        deskripsi: jenis_cagar_budaya.deskripsi,
    });

    const onChange = (e) => setData(e.target.name, e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        put(
            route("jenis_cagar_budaya.update", {
                jenis_cagar_budaya: jenis_cagar_budaya.id,
            }),
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    router.visit(route("jenis_cagar_budaya.index"));
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Perbaharui Jenis Cagar Budaya
                </h2>
            }
        >
            <Head title="Tambah Jenis Cagar Budaya" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit} className="space-y-3">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                        Nama
                                    </legend>
                                    <input
                                        type="text"
                                        className="input w-full"
                                        placeholder="Nama"
                                        name="nama"
                                        value={data.nama}
                                        onChange={onChange}
                                    />
                                    {errors.nama ? (
                                        <div className="label">
                                            {errors.nama}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </fieldset>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                        Deskripsi
                                    </legend>
                                    <textarea
                                        className="textarea h-24 w-full"
                                        placeholder="Deksripsi"
                                        name="deskripsi"
                                        value={data.deskripsi}
                                        onChange={onChange}
                                    ></textarea>
                                    {errors.deskripsi ? (
                                        <div className="label">
                                            {errors.deskripsi}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </fieldset>

                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={route("jenis_cagar_budaya.index")}
                                        preserveScroll={true}
                                        preserveState={true}
                                        className="btn btn-neutral"
                                    >
                                        Batalkan
                                    </Link>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <span className="loading loading-spinner loading-md"></span>{" "}
                                                Memperbaharui
                                            </>
                                        ) : (
                                            <>
                                                <FiSave /> Perbaharui
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

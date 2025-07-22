import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { FiSave } from "react-icons/fi";

export default function Create({ cagar_budaya, jenis_cagar_budayas }) {
    const { data, setData, put, processing, progress, errors } = useForm({
        jenis_cagar_budaya_id: cagar_budaya.jenis_cagar_budaya_id,
        nama: cagar_budaya.nama,
        deskripsi: cagar_budaya.deskripsi,
    });

    const onChange = (e) => setData(e.target.name, e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        put(
            route("cagar_budaya.update", {
                cagar_budaya: cagar_budaya.id,
            }),
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    router.visit(route("cagar_budaya.index"));
                },
            }
        );
    };

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
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit} className="space-y-3">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                        Jenis Cagar Budaya
                                    </legend>
                                    <select
                                        defaultValue="Pick a browser"
                                        className="select"
                                        name="jenis_cagar_budaya_id"
                                        value={data.jenis_cagar_budaya_id}
                                        onChange={onChange}
                                    >
                                        <option>
                                            .: Pilih Jenis Cagar Budaya :.
                                        </option>
                                        {jenis_cagar_budayas.map(
                                            (jenis_cagar_budaya) => (
                                                <option
                                                    value={
                                                        jenis_cagar_budaya.id
                                                    }
                                                >
                                                    {jenis_cagar_budaya.nama}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    {errors.jenis_cagar_budaya_id ? (
                                        <div className="label text-error">
                                            {errors.jenis_cagar_budaya_id}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </fieldset>

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
                                        <div className="label text-error">
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
                                        <div className="label text-error">
                                            {errors.deskripsi}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </fieldset>

                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={route("cagar_budaya.index")}
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

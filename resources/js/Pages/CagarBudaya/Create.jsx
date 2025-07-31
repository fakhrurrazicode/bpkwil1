import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";

export default function Create({ jenis_cagar_budayas }) {
    const { data, setData, post, processing, progress, errors } = useForm({
        jenis_cagar_budaya_id: "",
        nama: "",
        sifat: "",
        kode_provinsi: "",
        kode_kabupaten: "",
        kode_kecamatan: "",
        kode_desa: "",
        alamat: "",
        latitude: "",
        longitude: "",
        elevasi: "",
        periode: "",

        deskripsi: "",
    });

    const [listProvinsi, setListProvinsi] = useState([]);
    const [listKabupaten, setListKabupaten] = useState([]);
    const [listKecamatan, setListKecamatan] = useState([]);
    const [listDesa, setListDesa] = useState([]);

    // Load provinces on component mount
    useEffect(() => {
        fetch("/api/provinces")
            .then((response) => response.json())
            .then((data) => setListProvinsi(data));
    }, []);

    // Load cities when province is selected
    useEffect(() => {
        if (data.kode_provinsi) {
            fetch(`/api/cities/${data.kode_provinsi}`)
                .then((response) => response.json())
                .then((data) => setListKabupaten(data));
        }
    }, [data.kode_provinsi]);

    // Load districts when city is selected
    useEffect(() => {
        if (data.kode_kabupaten) {
            fetch(`/api/districts/${data.kode_kabupaten}`)
                .then((response) => response.json())
                .then((data) => setListKecamatan(data));
        }
    }, [data.kode_kabupaten]);

    // Load villages when district is selected
    useEffect(() => {
        if (data.kode_kecamatan) {
            fetch(`/api/villages/${data.kode_kecamatan}`)
                .then((response) => response.json())
                .then((data) => setListDesa(data));
        }
    }, [data.kode_kecamatan]);

    const onChange = (e) => {
        switch (e.target.name) {
            case "kode_provinsi":
                setData("kode_provinsi", e.target.value);
                setData("kode_kabupaten", "");
                setData("kode_kecamatan", "");
                setData("kode_desa", "");
                setListKabupaten([]);
                setListKecamatan([]);
                setListDesa([]);
                break;

            case "kode_kabupaten":
                setData("kode_kabupaten", e.target.value);
                setData("kode_kecamatan", "");
                setData("kode_desa", "");
                setListKecamatan([]);
                setListDesa([]);
                break;

            case "kode_kecamatan":
                setData("kode_kecamatan", e.target.value);
                setData("kode_desa", "");
                setListDesa([]);
                break;

            case "kode_desa":
                setData("kode_desa", e.target.value);
                break;

            default:
                setData(e.target.name, e.target.value);
                break;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("cagar_budaya.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                router.visit(route("cagar_budaya.index"));
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Tambah Cagar Budaya
                </h2>
            }
        >
            <Head title="Tambah Cagar Budaya" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="card bg-base-100 card-md shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Identitas Umum</h2>

                            <div>
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
                                                        {
                                                            jenis_cagar_budaya.nama
                                                        }
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
                                            Sifat
                                        </legend>
                                        <select
                                            className="select"
                                            name="sifat"
                                            value={data.sifat}
                                            onChange={onChange}
                                        >
                                            <option>.: Pilih Sifat :.</option>
                                            {["profan", "sakral"].map(
                                                (sifat) => (
                                                    <option value={sifat}>
                                                        {sifat}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        {errors.sifat ? (
                                            <div className="label text-error">
                                                {errors.sifat}
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </fieldset>

                                    <div className="grid grid-cols-2 gap-2">
                                        <fieldset className="fieldset">
                                            <legend className="fieldset-legend">
                                                Provinsi
                                            </legend>
                                            <select
                                                className="select"
                                                name="kode_provinsi"
                                                value={data.kode_provinsi}
                                                onChange={onChange}
                                            >
                                                <option>
                                                    .: Pilih Provinsi :.
                                                </option>
                                                {listProvinsi.map(
                                                    (provinsi) => (
                                                        <option
                                                            value={
                                                                provinsi.code
                                                            }
                                                        >
                                                            {provinsi.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            {errors.kode_provinsi ? (
                                                <div className="label text-error">
                                                    {errors.kode_provinsi}
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </fieldset>

                                        <fieldset className="fieldset">
                                            <legend className="fieldset-legend">
                                                Kabupaten
                                            </legend>
                                            <select
                                                className="select"
                                                name="kode_kabupaten"
                                                value={data.kode_kabupaten}
                                                onChange={onChange}
                                            >
                                                <option>
                                                    .: Pilih Kabupaten :.
                                                </option>
                                                {listKabupaten.map(
                                                    (kabupaten) => (
                                                        <option
                                                            value={
                                                                kabupaten.code
                                                            }
                                                        >
                                                            {kabupaten.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            {errors.kode_kabupaten ? (
                                                <div className="label text-error">
                                                    {errors.kode_kabupaten}
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </fieldset>

                                        <fieldset className="fieldset">
                                            <legend className="fieldset-legend">
                                                Kecamatan
                                            </legend>
                                            <select
                                                className="select"
                                                name="kode_kecamatan"
                                                value={data.kode_kecamatan}
                                                onChange={onChange}
                                            >
                                                <option>
                                                    .: Pilih Kecamatan :.
                                                </option>
                                                {listKecamatan.map(
                                                    (kecamatan) => (
                                                        <option
                                                            value={
                                                                kecamatan.code
                                                            }
                                                        >
                                                            {kecamatan.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            {errors.kode_kecamatan ? (
                                                <div className="label text-error">
                                                    {errors.kode_kecamatan}
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </fieldset>

                                        <fieldset className="fieldset">
                                            <legend className="fieldset-legend">
                                                Desa
                                            </legend>
                                            <select
                                                className="select"
                                                name="kode_desa"
                                                value={data.kode_desa}
                                                onChange={onChange}
                                            >
                                                <option>
                                                    .: Pilih Desa :.
                                                </option>
                                                {listDesa.map((desa) => (
                                                    <option value={desa.code}>
                                                        {desa.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.kode_desa ? (
                                                <div className="label text-error">
                                                    {errors.kode_desa}
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </fieldset>
                                    </div>

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">
                                            Alamat
                                        </legend>
                                        <textarea
                                            className="textarea h-24 w-full"
                                            placeholder="Alamat"
                                            name="alamat"
                                            value={data.alamat}
                                            onChange={onChange}
                                        ></textarea>
                                        {errors.alamat ? (
                                            <div className="label text-error">
                                                {errors.alamat}
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </fieldset>

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">
                                            Periode
                                        </legend>
                                        <select
                                            className="select"
                                            name="periode"
                                            value={data.periode}
                                            onChange={onChange}
                                        >
                                            <option>.: Pilih Periode :.</option>
                                            {[
                                                "prasejarah",
                                                "klasik",
                                                "kolonial",
                                                "pergerakan",
                                                "modern",
                                            ].map((periode) => (
                                                <option value={periode}>
                                                    {periode}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.periode ? (
                                            <div className="label text-error">
                                                {errors.periode}
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
                                                    Menyimpan
                                                </>
                                            ) : (
                                                <>
                                                    <FiSave /> Simpan
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

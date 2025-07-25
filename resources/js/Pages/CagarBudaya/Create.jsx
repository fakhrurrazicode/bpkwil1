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

    const [listKodeProvinsi, setListKodeProvinsi] = useState([]);
    const [listKodeKabupaten, setListKodeKabupaten] = useState([]);
    const [listKodeKecamatan, setListKodeKecamatan] = useState([]);
    const [listKodeDesa, setListKodeDesa] = useState([]);

    // const [selectedProvince, setSelectedProvince] = useState("");
    // const [selectedCity, setSelectedCity] = useState("");
    // const [selectedDistrict, setSelectedDistrict] = useState("");

    // Load provinces on component mount
    useEffect(() => {
        fetch("/api/provinces")
            .then((response) => response.json())
            .then((data) => setListKodeProvinsi(data));
    }, []);

    // Load cities when province is selected
    useEffect(() => {
        if (data.kode_provinsi) {
            fetch(`/api/cities/${data.kode_provinsi}`)
                .then((response) => response.json())
                .then((data) => setListKodeKabupaten(data));
            ``;
        }
    }, [data.kode_provinsi]);

    // Load districts when city is selected
    useEffect(() => {
        if (data.kode_kabupaten) {
            fetch(`/api/districts/${data.kode_kabupaten}`)
                .then((response) => response.json())
                .then((data) => setListKodeKecamatan(data));
        }
    }, [data.kode_kabupaten]);
    ``;
    // Load villages when district is selected
    useEffect(() => {
        if (data.kode_kecamatan) {
            fetch(`/api/villages/${data.kode_kecamatan}`)
                .then((response) => response.json())
                .then((data) => setListKodeDesa(data));
        }
    }, [data.kode_kecamatan]);

    const onChange = (e) => {
        switch (e.target.name) {
            case "kode_provinsi":
                setData("kode_provinsi", e.target.value);
                setData("kode_kabupaten", "");
                setData("kode_kecamatan", "");
                setListKodeDesa([]);
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
                                            {listKodeProvinsi.map(
                                                (kode_provinsi) => (
                                                    <option
                                                        value={
                                                            kode_provinsi.kode
                                                        }
                                                    >
                                                        {kode_provinsi.name}
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
                                            {["sample kabupaten"].map(
                                                (kode_kabupaten) => (
                                                    <option
                                                        value={kode_kabupaten}
                                                    >
                                                        {kode_kabupaten}
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
                                            {["sample kecamatan"].map(
                                                (kode_kecamatan) => (
                                                    <option
                                                        value={kode_kecamatan}
                                                    >
                                                        {kode_kecamatan}
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
                                            <option>.: Pilih Desa :.</option>
                                            {["sample provinsi"].map(
                                                (kode_desa) => (
                                                    <option value={kode_desa}>
                                                        {kode_desa}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        {errors.kode_desa ? (
                                            <div className="label text-error">
                                                {errors.kode_desa}
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </fieldset>

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

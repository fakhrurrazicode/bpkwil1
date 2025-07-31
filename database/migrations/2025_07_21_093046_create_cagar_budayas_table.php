<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cagar_budaya', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('jenis_cagar_budaya_id')->unsigned()->index();
            $table->foreign('jenis_cagar_budaya_id')->references('id')->on('jenis_cagar_budaya')->onDelete('cascade');


            // Identitas Umum
            $table->string('nama');
            $table->enum('sifat', ['profan', 'sakral'])->nullable();
            $table->char('kode_provinsi', 2)->nullable();
            $table->char('kode_kabupaten', 4)->nullable();
            $table->char('kode_kecamatan', 7)->nullable();
            $table->char('kode_desa', 10)->nullable();
            $table->string('alamat')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 10, 8)->nullable();
            $table->decimal('elevasi', 10, 8)->nullable();
            $table->enum('periode', ['prasejarah', 'klasik', 'kolonial', 'pergerakan', 'modern'])->nullable();

            // Kondisi Terkini
            $table->enum('keutuhan', ['utuh', 'tinggal sebagian', 'musnah'])->nullable();
            $table->enum('pemeliharaan', ['terpelihara', 'tidak terpelihara'])->nullable();
            $table->enum('pemugaran', ['pernah', 'belum pernah'])->nullable(); // tambahkan table riwayat pemugaran
            $table->enum('adaptasi', ['ada', 'tidak ada'])->nullable(); // tambahkan table riwayat adaptasi

            // Kepemilikan
            $table->enum('status_kepemilikan', ['pemerintah', 'non-pemerintah'])->nullable();
            $table->string('nama_pemilik')->nullable();
            $table->char('kode_provinsi_pemilik', 2)->nullable();
            $table->char('kode_kabupaten_pemilik', 4)->nullable();
            $table->char('kode_kecamatan_pemilik', 7)->nullable();
            $table->char('kode_desa_pemilik', 10)->nullable();
            $table->string('alamat_pemilik')->nullable();
            $table->decimal('latitude_pemilik', 10, 8)->nullable();
            $table->decimal('longitude_pemilik', 10, 8)->nullable();
            $table->enum('perolehan', ['warisan', 'pembelian', 'hadiah', 'dll'])->nullable();


            // Pengelolaan
            $table->enum('status_pengelolaan', ['dikelola sendiri', 'pemerintah', 'non-pemerintah'])->nullable();
            $table->string('nama_pengelola')->nullable();
            $table->char('kode_provinsi_pengelola', 2)->nullable();
            $table->char('kode_kabupaten_pengelola', 4)->nullable();
            $table->char('kode_kecamatan_pengelola', 7)->nullable();
            $table->char('kode_desa_pengelola', 10)->nullable();
            $table->string('alamat_pengelola')->nullable();
            $table->decimal('latitude_pengelola', 10, 8)->nullable();
            $table->decimal('longitude_pengelola', 10, 8)->nullable();

            // Deskripsi
            $table->text('deskripsi')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cagar_budaya');
    }
};

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
            $table->foreign('jenis_cagar_budaya_id')->references('id')->on('cagar_budaya')->onDelete('cascade');

            $table->string('nama');
            $table->text('deskripsi');

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

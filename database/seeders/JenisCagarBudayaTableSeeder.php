<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class JenisCagarBudayaTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('jenis_cagar_budaya')->delete();
        
        \DB::table('jenis_cagar_budaya')->insert(array (
            0 => 
            array (
                'id' => 1,
                'nama' => 'Benda Cagar Budaya',
                'deskripsi' => 'Benda cagar budaya adalah benda alami atau buatan manusia, baik utuh maupun bagian-bagiannya, yang memiliki hubungan erat dengan sejarah, ilmu pengetahuan, pendidikan, agama, dan/atau kebuday',
                'deleted_at' => NULL,
                'created_at' => NULL,
                'updated_at' => '2025-07-21 09:19:00',
            ),
            1 => 
            array (
                'id' => 2,
                'nama' => 'Bangunan Cagar Budaya',
                'deskripsi' => 'Bangunan cagar budaya adalah susunan hasil kegiatan manusia atau hasil perpaduan antara hasil kegiatan manusia dan alam yang berwujud masa lalu, seperti rumah, istana, candi, tempat ibadah, d',
                'deleted_at' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'nama' => 'Struktur Cagar Budaya',
                'deskripsi' => 'Struktur cagar budaya adalah bangunan atau susunan ruang yang memiliki hubungan dengan aktivitas manusia di masa lalu, seperti saluran irigasi, terowongan, benteng, jembatan, dan sejenisnya y',
                'deleted_at' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'nama' => 'Situs Cagar Budaya',
                'deskripsi' => 'Situs cagar budaya adalah lokasi yang mengandung benda, bangunan, dan/atau struktur yang saling terkait, yang berada dalam satu lokasi dan menunjukkan adanya aktivitas manusia di masa lalu.',
                'deleted_at' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'nama' => 'Kawasan Cagar Budaya',
                'deskripsi' => 'Kawasan cagar budaya adalah satuan ruang geografis yang memiliki dua atau lebih satuan Cagar Budaya yang letaknya berdekatan dan/atau menunjukkan hubungan fungsional, yang menyatu dalam satu ',
                'deleted_at' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 6,
                'nama' => 'Test',
                'deskripsi' => 'Test',
                'deleted_at' => '2025-07-21 09:28:01',
                'created_at' => '2025-07-21 09:08:14',
                'updated_at' => '2025-07-21 09:28:01',
            ),
        ));
        
        
    }
}
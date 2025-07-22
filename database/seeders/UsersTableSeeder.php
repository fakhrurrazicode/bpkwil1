<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {


        \DB::table('users')->delete();

        \DB::table('users')->insert(array(
            0 =>
            array(
                'id' => 1,
                'name' => 'Fakhrurrazi',
                'email' => 'fakhrurrazi.code@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$12$/C.Sk1trZL.5I/qFEnmWN.ykJIf8w/..yHEWRLnbLMurFG9uuo95O',
                'remember_token' => NULL,
                'created_at' => '2025-07-21 07:46:57',
                'updated_at' => '2025-07-21 07:46:57',
            ),
        ));
    }
}

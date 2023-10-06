<?php

use Illuminate\Database\Seeder;
use App\User;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->matricula = '123';
        $user->name = "Everton";
        $user->email = "test@test.com";
        $user->password = bcrypt("123");
        $user->professor = false;
        $user->save();
    }
}

<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $users =  [
      [
        'name' => 'User',
        'email' => 'user@gmail.com',
        'password' => Hash::make("password"),
        'role' => '0',
        'profile' => 'img/users/user1.jpg',
        'created_at' => new \DateTime(),
        'updated_at' => new \DateTime(),
      ],
      [
        'name' => 'Admin',
        'email' => 'admin@gmail.com',
        'password' => Hash::make("password"),
        'role' => '1',
        'profile' => 'img/users/user2.jpg',
        'created_at' => new \DateTime(),
        'updated_at' => new \DateTime(),
      ]
    ];

    User::insert($users);
  }
}

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
        'role' => 'user',
        'profile' => 'storage/users/default.jpg',
        'created_at' => new \DateTime(),
        'updated_at' => new \DateTime(),
      ],
      [
        'name' => 'Admin',
        'email' => 'admin@gmail.com',
        'password' => Hash::make("password"),
        'role' => 'admin',
        'profile' => 'storage/users/default.jpg',
        'created_at' => new \DateTime(),
        'updated_at' => new \DateTime(),
      ]
    ];

    User::insert($users);
  }
}

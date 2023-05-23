<?php

namespace App\Dao\User;

use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Operator;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreUserPasswordRequest;
use App\Contracts\Dao\User\UserDaoInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

/**
 * Data accessing object for user
 */
class UserDao implements UserDaoInterface
{
  /**
   * To get profile data by id
   * @return Object $user user object
   */
  public function getProfileData()
  {
    return DB::transaction(function () {
      $user = User::find(Auth::id());
      return $user;
    });
  }

  /**
   * To get user list.
   * @return array $user list.
   */
  public function getAllUserList()
  {
    return DB::transaction(function () {
      $condition = [];
      if (request()->query('name')) {
          array_push($condition, [
            "name",
            'LIKE',
            '%' . request()->query('name') . '%']);
      }
      if (request()->query('email')) {
        array_push($condition, [
          "email",
          'LIKE',
          '%' . request()->query('email') . '%']);
      }
      return User::where($condition)->paginate(request()->query('limit'));
    });
  }

  /**
   * Get user by id
   * 
   * @param $id
   * @return Object
   */
  public function getUserById($id) 
  {
    return User::find($id);
  }

  /**
   * Create user
   *
   * @param $userData
   * @return Object
   */
  public function createUser($userInfo)
  {
    return User::create($userInfo);
  }

  /**
   * Update user
   * 
   * @param $userData, $id
   * @return object
   */
  public function updateUser($userData, $id) 
  {
    return User::find($id)->update($userData);
  }

  public function deleteUser($id) 
  {
    return User::find($id)->delete();
  }
}

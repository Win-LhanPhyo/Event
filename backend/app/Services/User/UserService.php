<?php

namespace App\Services\User;

use App\Contracts\Dao\User\UserDaoInterface;
use App\Contracts\Services\User\UserServiceInterface;
use Illuminate\Support\Facades\Hash;

/**
 * Service class for user.
 */
class UserService implements UserServiceInterface
{
  /**
   * user dao
   */
  private $userDao;
  /**
   * Class Constructor
   * @param UserDaoInterface
   */
  public function __construct(UserDaoInterface $userDao)
  {
    $this->userDao = $userDao;
  }

  /**
   * To get profile data by id
   * @return Object $profile data.
   */
  public function getProfileData()
  {
    $profile = $this->userDao->getProfileData();
    return $profile;
  }

  /**
   * get all user data.
   * @return Object $user User Object
   */
  public function getAllUserList()
  {
    $user = $this->userDao->getAllUserList();
    return $user;
  }

  /**
   * get user by id.
   * @param $id
   * @return Object $userData
   */
  public function getUserById($id)
  {
    $user = $this->userDao->getUserById($id);
    return $user;
  }

  /**
   * Create user
   * @param $userInfo
   * @return void
   */
  public function createUser($userInfo)
  {
    $userData = [
      'name' => $userInfo->name,
      'email' => $userInfo->email,
      'password' => Hash::make($userInfo->password),
      'role' => $userInfo->role,
      'dob' => $userInfo->dob,
      'address' => $userInfo->address,
      'phone' => $userInfo->phone,
      'profile' => $userInfo->profile
    ];
    return $this->userDao->createUser($userData);
  }

  /**
   * Update user data.
   * @param $request, $id
   * @return Object $user
   */
  public function updateUser($userInfo, $id) 
  {
    $userData = [
      'name' => $userInfo->name,
      'email' => $userInfo->email,
      'role' => $userInfo->role,
      'dob' => $userInfo->dob,
      'address' => $userInfo->address,
      'phone' => $userInfo->phone
    ];
    if (isset($userInfo->password))
    {
      $userData['password'] = Hash::make($userInfo->password);
    }
    if (isset($userInfo->profile))
    {
      $userData['profile'] = $userInfo->profile;
    }
    return $this->userDao->updateUser($userData, $id);
  }

  /**
   * Delete user data.
   * @param $id
   * @return void
   */
  public function deleteUser($id) {
    return $this->userDao->deleteUser($id);
  }
}

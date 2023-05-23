<?php

namespace App\Contracts\Services\User;


/**
 * Interface for user service
 */
interface UserServiceInterface
{
  /**
   * To get profile data
   * @return Object $profile data.
   */
  public function getProfileData();

  /**
   * To get all user data.
   * @return Object $user data.
   */
  public function getAllUserList();

  /**
   * get user by id
   * @param $id
   * @return Object
   */
  public function getUserById($id);

  /**
   * Create user.
   * @param $userInfo
   * @return Object $user data.
   */
  public function createUser($userInfo);

  /**
   * Update user.
   * @param $request, $id
   * @return Object $user
   */
  public function updateUser($userData, $id);

  /**
   * Delete user data.
   * @param $id
   * @return void
   */
  public function deleteUser($id);
}

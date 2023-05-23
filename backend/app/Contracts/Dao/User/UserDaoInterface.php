<?php

namespace App\Contracts\Dao\User;


/**
 * Interface for Data Accessing Object of User
 */
interface UserDaoInterface
{
  /**
   * get profile data.
   * @return Object $user user object
   */
  public function getProfileData();

  /**
   * get all user data.
   * @return Object $user User Object
   */
  public function getAllUserList();

  /**
   * get user by id
   * @param $id
   * @return Object
   */
  public function getUserById($id);

  /**
   * create user data.
   * @return Object $user User Object
   */
  public function createUser($userData);

  /**
   * update user data
   * @param $request,$id
   * @return Object $user
   */
  public function updateUser($userData, $id);

  /**
   * delete user data.
   * @param $id
   * @return void
   */
  public function deleteUser($id);
}

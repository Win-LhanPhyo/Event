<?php

namespace App\Http\Controllers\User;

use App\Contracts\Services\User\UserServiceInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Response;
use Validator;

class UserController extends Controller
{

  /**
   * user interface
   */
  private $userInterface;

  /**
   * Class Constructor
   * @param userService
   * @return
   */
  public function __construct(UserServiceInterface $userServiceInterface)
  {
    $this->userInterface = $userServiceInterface;
  }

  /**
   * Get All users.
   * @return Response
   */
  public function getAllUserList()
  {
    $user = $this->userInterface->getAllUserList();
    return response()->json($user, 200);
  }

  /**
   * Create user
   *
   * @param Request $request
   * @return void
   */
  public function createUser(Request $request)
  {
    $validator = $this->validateCreateUser($request);
    if ($validator->fails()) {
      return response()->json(400);
    } else {
      $userInfo = $this->userInfo($request, true);
      $this->userInterface->createUser($userInfo);
      return response()->json([
        'message' => 'new user successfully'
      ]);
    }
  }

  public function getProfileData()
  {
    $user = $this->userInterface->getProfileData();
    return response()->json($user, 200);
  }

  /**
   * Get user by id
   * @param $id
   * @return object
   */
  public function getUserById($id)
  {
    $user = $this->userInterface->getUserById($id);
    return $user;
  }

  /**
   * Validate User.
   * @param Request $request
   * @return Obj
   */
  private function validateCreateUser(Request $request)
  {
    return $validator = Validator::make($request->all(), [
      'name' => 'required',
      'email' => 'required',
      'password' => 'required',
      'role' => 'required'
    ]);
  }

    /**
   * Validate User.
   * @param Request $request
   * @return Obj
   */
  private function validateUpdateUser(Request $request)
  {
    return $validator = Validator::make($request->all(), [
      'name' => 'required',
      'email' => 'required',
      'role' => 'required'
    ]);
  }

  /**
   * User info
   * @param Request $request
   * @return void
   */
  private function userInfo($request, $create_flg=false)
  {
    $userObj = new \stdClass();
    $userObj->name = trim($request->name);
    $userObj->email = trim($request->email);
    $userObj->password = trim($request->password);
    $userObj->role = trim($request->role);
    $userObj->dob = trim($request->dob);
    $userObj->address = trim($request->address);
    $userObj->phone = trim($request->phone);
    if ($request->file('profile')) {
      $file = $request->file('profile');
      $fileName = 'profile-' . time() . '.' . $file->getClientOriginalExtension();
      $path = $file->storeAs('public/users', $fileName);
      $userObj->profile = trim('storage/users/'.$fileName);
    } else if ($create_flg === true) {
      $userObj->profile = trim('storage/users/default.jpg');
    }
    return $userObj;
  }

  /**
   * update user data.
   * @param $request, $id
   * @return Object
   */
  public function updateUser(Request $request, int $id) {
    $validator = $this->validateUpdateUser($request);
    if ($validator->fails()) {
      return response()->json(400);
    } else {
      $userInfo = $this->userInfo($request);
      $this->userInterface->updateUser($userInfo, $id);
      return response()->json([
        'message' => 'User updated successfully'
      ]);
    }
  }

  public function deleteUser($id) {
    $this->userInterface->deleteUser($id);
    return response()->json([
      'message' => 'deleted successfully'
    ]);
  }
}

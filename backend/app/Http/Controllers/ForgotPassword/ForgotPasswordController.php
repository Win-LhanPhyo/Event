<?php 
  
namespace App\Http\Controllers\ForgotPassword; 
  
use App\Http\Controllers\Controller;
use Illuminate\Http\Request; 
use DB; 
use Carbon\Carbon; 
use App\Models\User; 
use Mail; 
use Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
  
class ForgotPasswordController extends Controller
{
  /**
   * Write code on Method
   *
   * @return response()
   */
  public function showForgetPasswordForm()
  {
      //return view('auth.forgetPassword');
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  public function submitForgetPasswordForm(Request $request)
  {
    $request->validate([
        'email' => 'required|email|exists:users',
    ]);

    $token = Str::random(64);

    DB::table('password_resets')->insert([
        'email' => $request->email, 
        'token' => $token, 
        'created_at' => Carbon::now()
    ]);

    $user = User::where('email', $request->email)->first();

    Mail::send('email.forgetPassword', ['token' => $token], function($message) use($request){
        $message->to($request->email);
        $message->subject('Reset Password');
    });

    return response()->json(['message'=>'We have e-mailed your password reset link!']);
  }
  /**
   * Write code on Method
   *
   * @return response()
   */
  public function showResetPasswordForm($token) { 
      return view('auth.forgetPasswordLink', ['token' => $token]);
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  public function submitResetPasswordForm(Request $request)
  {
    // $request->validate([
    //   'current_password' => 'required|email|exists:users',
    //   'new_password' => 'required|string|min:6|confirmed',
    //   'comfirm_new_password' => 'required'
    // ]);
    $updatePassword = DB::table('password_resets')
                        ->where([
                          'token' => $request->token
                        ])
                        ->first();

    if(!$updatePassword){
      return response()->json(['error'=>'Invalid token!']);
    }

    $user = User::where('email', 'scm.wailinoo@gmail.com')
                ->update(['password' => Hash::make($request->new_password)]);

    DB::table('password_resets')->where(['email'=> $request->current_password])->delete();

    return response()->json(['message'=>'Password is successfully changed!', 'user' => $user]);
  }
}

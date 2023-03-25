<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
class AuthController extends Controller
{
    //
    public function login(Request $request){
        if(Auth::attempt(['email' => $request->email,'password'=>$request->password])){
            $user = Auth::user();
            $role=$user->roles()->first();
            // $sucess['role'] = $role->shortrole;
            return response()->json([
                'sucess'=>true,
                'token' => $user->createToken($user)->accessToken,
                'fullName'=> $user->nom.' '.$user->prenom,
                'role'=> $role->shortrole,
                'id'=> $user->id,
                'message' => "Utilisateur connecté avec succès",
            ], Response::HTTP_OK);

        }
        else{
            return response()->json([
                'sucess'=>false,
                'message' => "Utilisateur non autorisé",
            ], Response::HTTP_UNAUTHORIZED);
        }
    }
    public function logout(Request $request){
        $request->user()->token()->revoke();
        return response()->json([
            'message' => "Déconnexion",
        ], Response::HTTP_OK);
    }
}

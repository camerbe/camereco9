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
            $sucess['token'] = $user->createToken('camereco')->accessToken;
            $sucess['name'] = $user->nom.' '.$user->prenom;
            $sucess['id'] = $user->id;
            return response()->json([
                'token' => $sucess,
                'message' => "Utilisateur connecté avec succès",
            ], Response::HTTP_OK);

        }
        else{
            return response()->json([
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

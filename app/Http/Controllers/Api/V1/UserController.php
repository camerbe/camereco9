<?php

namespace App\Http\Controllers\Api\V1;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\Role;
use App\Repositories\UserRepository;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $usr)
    {
        $this->userRepository = $usr;
    }

    public function index()
    {

        //
        if(Auth::user()->can('viewAny',User::class)){
            $usrs= $this->userRepository->findAll();
            return response()->json([
                "sucess"=>true,
                "users"=>$usrs,
                "message"=>"Liste des Administrateurs",

            ],Response::HTTP_OK);
        }
        else{
            return response()->json([
                "sucess"=>false,
                "message"=>"Pas autorisé",

            ],Response::HTTP_UNAUTHORIZED);
        }

    }
    public function show($id)
    {
        //
        if(Auth::user()->can('view',User::class)){
            $user = $this->userRepository->findById($id);
            return response()->json([
                'sucess'=>true,
                'Utilisateur' => $user,
                "message" => "Administrateur trouvé"
            ], Response::HTTP_OK);
        }
        else{
            return response()->json([
                'sucess'=>false,
                "message" => "Pas autorisé"
            ], Response::HTTP_OK);
        }

    }
    public function store(UserRequest $request)
    {
        //
        if(Auth::user()->can('create',User::class)){
            $usr = $this->userRepository->create($request->all());
            return response()->json([
                "sucess" => true,
                "utilisateur" => $usr,
                "message" => "Administrateur ajouté"
            ], Response::HTTP_OK);
        }
        else{
            return response()->json([
                "sucess" => false,
                "message" => "Pas autorisé à insérer les administrateurs"
            ], Response::HTTP_OK);
        }

    }
    public function update(Request $request,  $id)
    {
        //
        if(Auth::user()->can('update',User::class)){
            $this->userRepository->update($request->all(), $id);
            return response()->json([
                "sucess" => true,
                "message" => "Administrateur mis à jour"
            ], Response::HTTP_OK);
        }
        else{
            return response()->json([
                "sucess" => false,
                "message" => "Pas autorisé à mettre à jour les administrateurs"
            ], Response::HTTP_UNAUTHORIZED);
        }

    }
    public function destroy($id)
    {
        //
        if(Auth::user()->can('delete',User::class,Role::class)){
            $this->userRepository->delete($id);
            return response()->json([
                "sucess" => true,
                "message" => "Administrateur supprimé"
            ], Response::HTTP_OK);
        }
        else{
            return response()->json([
                "sucess" => false,
                "message" => "Pas autorisé à supprimer les administrateurs"
            ], Response::HTTP_UNAUTHORIZED);
        }

    }
    // public function destroy($id)
    // {
    //     //
    //     if(Auth::user()->can('delete',User::clasS)){
    //         $this->userRepository->delete($id);
    //         return response()->json([
    //             "sucess"=>true,
    //             "message" => "Administrateur supprimé"
    //         ], Response::HTTP_ACCEPTED);
    //     }
    //     else{
    //         return response()->json([
    //             "sucess"=>false,
    //             "message" => "Pas autorisé à supprimer un administrateur"
    //         ], Response::HTTP_UNAUTHORIZED);
    //     }

    // }
}

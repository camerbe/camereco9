<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Repositories\UserRepository;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $usr)
    {
        $this->userRepository = $usr;
    }
    public function login(Request $request){

    }
    public function index()
    {
        //
        $usrs= $this->userRepository->findAll();
        return response()->json([
            "Utilisateurs"=>$usrs,
            "message"=>"Liste des utilisateurs",

        ],Response::HTTP_OK);
    }
    public function show($id)
    {
        //
        $user = $this->userRepository->findById($id);
        return response()->json([
            'Utilisateur' => $user,
            "message" => "Utilisateur trouvé"
        ], Response::HTTP_FOUND);
    }
    public function store(UserRequest $request)
    {
        //
        $usr = $this->userRepository->create($request->all());
        return response()->json([
            "utilisateur" => $usr,
            "message" => "Utilisateur ajouté"
        ], Response::HTTP_CREATED);
    }
    public function update(Request $request,  $id)
    {
        //
        $this->userRepository->update($request->all(), $id);
        return response()->json([
            "message" => "Utilisateur mis à jour"
        ], Response::HTTP_ACCEPTED);
    }
    public function destroy($id)
    {
        //
        $this->userRepository->delete($id);
        return response()->json([
            "message" => "Utilisateur supprimé"
        ], Response::HTTP_ACCEPTED);
    }
}

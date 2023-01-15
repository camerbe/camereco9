<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Repositories\RoleRepository;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\RoleRequest;
use Illuminate\Support\Facades\Auth;
class RoleController extends Controller
{
    protected $rolerepository;

    public function __construct(RoleRepository $rolerepository)
    {
        $this->rolerepository = $rolerepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        if(Auth::user()->can('viewAny',User::class)){
            $roles= $this->rolerepository->findAll();
            return response()->json([
                "sucess"=>true,
                "Roles"=>$roles,
                "message"=>"Liste des rôles",

            ],Response::HTTP_OK);
        }
        else{
            return response()->json([
                "sucess"=>false,
                "message"=>"Pas autorisé à lister les rôles",

            ],Response::HTTP_UNAUTHORIZED);
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {
        //
        if(Auth::user()->can('create',User::class)){
            $role = $this->rolerepository->create($request->all());
            return response()->json([
                "sucess"=>true,
                "role" => $role,
                "message" => "Role ajouté"
            ], Response::HTTP_CREATED);
        }
        else{
            return response()->json([
                "sucess"=>false,
                "message" => "Pas autorisé à ajouter un rôle "
            ], Response::HTTP_UNAUTHORIZED);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        if(Auth::user()->can('view',User::class,Role::class)){
            $role = $this->rolerepository->findById($id);
            return response()->json([
                "sucess"=>true,
                'role' => $role,
                "message" => "Rôle trouvé"
            ], Response::HTTP_FOUND);
        }
        else{
            return response()->json([
                "sucess"=>false,
                "message" => "Pas autorisé"
            ], Response::HTTP_UNAUTHORIZED);
        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        //
        if(Auth::user()->can('update',User::class,Role::class)){
            $this->rolerepository->update($request->all(), $id);
            return response()->json([
                "sucess"=>true,
                "message" => "Role mis à jour"
            ], Response::HTTP_ACCEPTED);
        }
        else{
            return response()->json([
                "sucess"=>false,
                "message" => "Pas autorisé à mettre un rôle à jour"
            ], Response::HTTP_UNAUTHORIZED);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        if(Auth::user()->can('delete',User::class,Role::class)){
            $this->rolerepository->delete($id);
            return response()->json([
                "sucess"=>true,
                "message" => "Role supprimé"
            ], Response::HTTP_ACCEPTED);
        }
        else{
            return response()->json([
                "sucess"=>false,
                "message" => "Pas autorisé à supprimer un rôle"
            ], Response::HTTP_UNAUTHORIZED);
        }

    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Repositories\RoleRepository;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\RoleRequest;
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
        $roles= $this->rolerepository->findAll();
        return response()->json([
            "Roles"=>$roles,
            "message"=>"Role list",

        ],Response::HTTP_OK);
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
        $role = $this->rolerepository->create($request->all());
        return response()->json([
            "role" => $role,
            "message" => "Role ajouté"
        ], Response::HTTP_CREATED);
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
        $role = $this->rolerepository->findById($id);
        return response()->json([
            'role' => $role,
            "message" => "Rôle trouvé"
        ], Response::HTTP_FOUND);
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
        $this->rolerepository->update($request->all(), $id);
        return response()->json([
            "message" => "Role mis à jour"
        ], Response::HTTP_ACCEPTED);
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
        $this->rolerepository->delete($id);
        return response()->json([
            "message" => "Role supprimé"
        ], Response::HTTP_ACCEPTED);
    }
}

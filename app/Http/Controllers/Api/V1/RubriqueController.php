<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Rubrique;
use Illuminate\Http\Request;
use App\Repositories\RubriqueRepository;
use App\Http\Requests\RubriqueRequest;
use Symfony\Component\HttpFoundation\Response;
class RubriqueController extends Controller
{
    protected $rubriquerepository;

    public function __construct(RubriqueRepository $rubriquerepository)
    {
        $this->rubriquerepository = $rubriquerepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $rubrique= $this->rubriquerepository->findAll();
        return response()->json([
            "Rubriques"=>$rubrique,
            "message"=>"Liste des rubriques",

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
    public function store(RubriqueRequest $request)
    {
        //
        $rubrique = $this->rubriquerepository->create($request->all());
        return response()->json([
            "rubrique" => $rubrique,
            "message" => "Rubrique ajoutée"
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rubrique  $rubrique
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $rubrique = $this->rubriquerepository->findById($id);
        return response()->json([
            'rubrique' => $rubrique,
            "message" => "Rubrique trouvée"
        ], Response::HTTP_FOUND);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Rubrique  $rubrique
     * @return \Illuminate\Http\Response
     */
    public function edit(Rubrique $rubrique)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rubrique  $rubrique
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $this->rubriquerepository->update($request->all(), $id);
        return response()->json([
            "message" => "Rubrique mise à jour"
        ], Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rubrique  $rubrique
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $this->rubriquerepository->delete($id);
        return response()->json([
            "message" => "Rubrique supprimée"
        ], Response::HTTP_ACCEPTED);
    }

}

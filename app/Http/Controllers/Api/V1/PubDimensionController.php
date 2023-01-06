<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\PubDimension;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\DimensionRequest;
use App\Repositories\PubDimensionRepository;
class PubDimensionController extends Controller
{
    protected $dimensionRepository;

    public function __construct(PubDimensionRepository $pubdimensionrepository)
    {
        $this->dimensionRepository = $pubdimensionrepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $dimensions= $this->dimensionRepository->findAll();
        return response()->json([
            "Dimensions"=>$dimensions,
            "message"=>"Liste des dimensions",

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
    public function store(DimensionRequest $request)
    {
        //
        $dimension = $this->dimensionRepository->create($request->all());
        return response()->json([
            "dimension"=>$dimension,
            "message"=>"Dimension ajoutée"
        ],Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PubDimension  $pubDimension
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $dimension = $this->dimensionRepository->findById($id);
        return response()->json([
            'Dimension' => $dimension,
            "message" => "Dimension trouvée"
        ], Response::HTTP_FOUND);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PubDimension  $pubDimension
     * @return \Illuminate\Http\Response
     */
    public function edit(PubDimension $pubDimension)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PubDimension  $pubDimension
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        //
        $this->dimensionRepository->update($request->all(), $id);
        return response()->json([
            "message" => "Dimension mise à jour"
        ], Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PubDimension  $pubDimension
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $this->dimensionRepository->delete($id);
        return response()->json([
            "message" => "Dimension supprimée"
        ], Response::HTTP_ACCEPTED);
    }
}

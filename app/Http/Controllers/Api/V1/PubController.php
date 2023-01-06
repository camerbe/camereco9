<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Pub;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\PubRequest;
use App\Repositories\PubRepository;
class PubController extends Controller
{
    protected $pubRepository;

    public function __construct(PubRepository $pubrepository)
    {
        $this->pubRepository = $pubrepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $pubs= $this->pubRepository->findAll();
        return response()->json([
            "Publicités"=>$pubs,
            "message"=>"Liste des publicités",

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
    public function store(PubRequest $request)
    {
        //
        $pub = $this->pubRepository->create($request->all());
        return response()->json([
            "pub"=>$pub,
            "message"=>"Publicité ajoutée"
        ],Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pub  $pub
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $pub = $this->pubRepository->findById($id);
        return response()->json([
            'Pub' => $pub,
            "message" => "Publicité trouvée"
        ], Response::HTTP_FOUND);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pub  $pub
     * @return \Illuminate\Http\Response
     */
    public function edit(Pub $pub)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pub  $pub
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        //
        $this->pubRepository->update($request->all(), $id);
        return response()->json([
            "message" => "Publicité mise à jour"
        ], Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pub  $pub
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $this->pubRepository->delete($id);
        return response()->json([
            "message" => "Publicité supprimée"
        ], Response::HTTP_ACCEPTED);
    }
}

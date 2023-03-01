<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Pays;
use App\Repositories\PaysRepository;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PaysController extends Controller
{
    protected $paysrepository;


    public function __construct(PaysRepository $paysrepository){
        $this->paysrepository=$paysrepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $countries= $this->paysrepository->findAll();
        return response()->json([
            "sucess"=>true,
            "countries"=>$countries,
            "message"=>"Liste des pays",

        ],Response::HTTP_OK);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $bled = $this->paysrepository->create($request->all());
        return response()->json([
            "sucess"=>true,
            "pays" => $bled,
            "message" => "Pays ajouté"
        ], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pays  $pays
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $pays = $this->paysrepository->findById($id);
        return response()->json([
            "sucess"=>true,
            'pays' => $pays,
            "message" => "Pays trouvé"
        ], Response::HTTP_OK);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pays  $pays
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $this->paysrepository->update($request->all(), $id);
        return response()->json([
            "sucess"=>true,
            "message" => "Pays mis à jour"
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pays  $pays
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $this->paysrepository->delete($id);
        return response()->json([
            "sucess"=>true,
            "message" => "Pays supprimé"
        ], Response::HTTP_OK);
    }
}

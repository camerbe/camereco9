<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Repositories\CategorieRepository;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\CategorieRequest;
use App\Http\Controllers\Api\V1\BaseController;
use App\Http\Resources\ArticleResource;
class CategorieController extends BaseController
{
    protected $categorieRepository;

    public function __construct(CategorieRepository $categorierepository)
    {
        $this->categorieRepository = $categorierepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $categories= $this->categorieRepository->findAll();
        return response()->json([
            "sucess"=>true,
            "categories"=>$categories,
            "message"=>"Liste des catégories",

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
    public function store(CategorieRequest $request)
    {
        //
        $categorie = $this->categorieRepository->create($request->all());
        return response()->json([
            "sucess"=>true,
            "categorie" => $categorie,
            "message" => "Catégorie ajoutée"
        ], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $categorie = $this->categorieRepository->findById($id);
        return response()->json([
            "sucess"=>true,
            'categorie' => $categorie,
            "message" => "Categorie trouvée"
        ], Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function edit(Categorie $categorie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $this->categorieRepository->update($request->all(), $id);
        return response()->json([
            "sucess"=>true,
            "message" => "Catégorie mise à jour"
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $this->categorieRepository->delete($id);
        return response()->json([
            "message" => "Catégorie supprimée"
        ], Response::HTTP_OK);
    }
}

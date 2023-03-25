<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repositories\ArticleRepository;

class FrontController extends Controller
{
    protected $articleRepository;

    public function __construct(ArticleRepository $articlerepository){
        $this->articleRepository=$articlerepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $articles=$this->articleRepository->findAll();
        if($articles){
            return response()->json([
                "sucess"=>true,
                "articles"=>$articles,

            ],Response::HTTP_OK);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur survenue lors de la recherche d'article"
        ],Response::HTTP_OK);
    }

    public function samerubrique($pays,$categorie){
        $articles=$this->articleRepository->sameRubrique($pays,$categorie);
        if($articles){
            return response()->json([
                "sucess"=>true,
                "articles"=>$articles,

            ],Response::HTTP_OK);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur survenue lors de la recherche d'article"
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        //
        $article=$this->articleRepository->getArticleBySlug($slug);
        if($article){
            return response()->json([
                'sucess'=>true,
                'article'=>$article,
                'message' => "Article trouvé"

            ],Response::HTTP_OK);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur survenue lors de la recherche d'article"
        ],Response::HTTP_OK);





    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

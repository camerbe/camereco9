<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repositories\ArticleRepository;
use App\Http\Requests\ArticleRequest;

class ArticleController extends Controller
{
    protected $articlerepository;

    public function __construct(ArticleRepository $articlerepository)
    {
        $this->articlerepository = $articlerepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $article= $this->articlerepository->findAll();
        return response()->json([
            "Articles"=>$article,
            "message"=>"Liste des articles",

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
    public function store(ArticleRequest $request)
    {
        //
        $article = $this->articlerepository->create($request->all());

        return response()->json([
            "article"=>$article,
            "message"=>"Article ajouté"
        ],Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $article = $this->articlerepository->findById($id);
        return response()->json([
            'Article' => $article,
            "message" => "Article trouvé"
        ], Response::HTTP_FOUND);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $this->articlerepository->update($request->all(), $id);
        return response()->json([
            "message" => "Article mis à jour"
        ], Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $this->articlerepository->delete($id);
        return response()->json([
            "message" => "Article supprimé"
        ], Response::HTTP_ACCEPTED);
    }
}

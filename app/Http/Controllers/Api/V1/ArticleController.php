<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repositories\ArticleRepository;
use App\Http\Requests\ArticleRequest;
use App\Http\Controllers\Api\V1\BaseController;

class ArticleController extends BaseController
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

        return $this->sendResponse($article, "Liste des articles");

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function same($pays,$categorie)
    {
        //
        $samerubrique = $this->articlerepository->sameRubrique($pays, $categorie);
        return $samerubrique ? $this->sendResponse($samerubrique, "Même rubrique") : $this->sendError("Erreur", ["Pas rubrique"]);
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
        // $validated = $request->validated();
        // $validated->fail()
        $article = $this->articlerepository->create($request->all());
        return $article ? $this->sendResponse($article, "Article ajouté") : $this->sendError("Echec de l'ajout d'un article", ["Erreur"]);

        // return response()->json([
        //     "article"=>$article,
        //     "message"=>"Article ajouté"
        // ],Response::HTTP_CREATED);
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
        $article = Article::find($id);
        ++$article->hit;
        $article->save();
        // dd($article);
        $article = $this->articlerepository->findById($id);
        return $article ? $this->sendResponse($article, "Article trouvé") : $this->sendError("Erreur", ["Article pas trouvé"]);

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
        return $this->sendResponse($this->articlerepository->update($request->all(), $id), "Article mis à jour");

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
        return $this->sendResponse($this->articlerepository->delete($id),"Article supprimé");
        // return response()->json([
        //     "message" => "Article supprimé"
        // ], Response::HTTP_ACCEPTED);
    }
}

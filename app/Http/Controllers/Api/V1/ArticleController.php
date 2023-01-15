<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repositories\ArticleRepository;
use App\Http\Requests\ArticleRequest;
use App\Http\Controllers\Api\V1\BaseController;
use Illuminate\Support\Facades\Auth;


class ArticleController extends BaseController
{
    protected $articlerepository;
    protected $user;

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
        // $usr = User::find(Auth::user()->id);
        // dd($usr->articles()->first());
        // if(Auth::user()->can('viewAny',User::class)){
            $articles= $this->articlerepository->getArticleByUserId(Auth::user()->id);
            return $this->sendResponse($articles, "Liste des articles");
        // }
        // else{
        //     return $this->sendError("Pas autorisé", ["Erreur"]);
        // }


    }
    public function articlebyuser($userid){
        $articles = $this->articlerepository->getArticleByUserId($userid);
        return $articles ? $this->sendResponse($articles, "Liste des articles") : $this->sendError("Erreur", ["Pas d'articles"]);
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
        //dd(Auth::user());
        if(Auth::user()->can('create',Article::class)){
            $article = $this->articlerepository->create($request->all());
            return $article ? $this->sendResponse($article, "Article ajouté") : $this->sendError("Echec de l'ajout d'un article", ["Erreur"]);
        }
        else{
            return $this->sendError("vous n'êtes pas autorisé à ajouter les articles", ["Echec"]);
        }


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
        $article = $this->articlerepository->findById($id);
        return $article ? $this->sendResponse($article, "Article trouvé") : $this->sendError("Erreur", ["Article pas trouvé"]);
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
        if(Auth::user()->can('delete',User::class,Article::class)){
            return $this->sendResponse($this->articlerepository->delete($id),"Article supprimé");
        }
        else{
            return $this->sendError("vous n'êtes pas autorisé à supprimer les articles", ["Echec"]);
        }

    }
}

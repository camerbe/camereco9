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

        if(Auth::user()->can('viewAny',Article::class)){
            $usr = $this->articlerepository->getArticleByUserId($userid);
            return response()->json([
                "sucess" => true,
                "articles" => $usr,
                "message" => "Liste des articles"
            ], Response::HTTP_OK);
        }
        else{
            return response()->json([
                "sucess" => false,
                "message" => "Pas d'article"
            ], Response::HTTP_OK);
        }


    }
    public function articlebyslug($lug){
        $article = $this->articlerepository->getArticleBySlug($lug);
        if($article){
            return response()->json([
                "sucess" => true,
                "articles" => $article,
                "message" => "Article trouvé"
            ], Response::HTTP_OK);
        }
        return response()->json([
            "sucess" => false,
            "message" => "Article pas trouvé"
        ], Response::HTTP_OK);

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
        if(Auth::user()->can('create',Article::class)){
            $usr = $this->articlerepository->create($request->all());
            return response()->json([
                "sucess" => true,
                "article" => $usr,
                "message" => "Article ajouté"
            ], Response::HTTP_OK);
        }
        else{
            return response()->json([
                "sucess" => false,
                "message" => "Pas autorisé"
            ], Response::HTTP_OK);
        }

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

        if(Auth::user()->can('view',User::class,Article::class)){
            $article= $this->articlerepository->findById($id);
            return response()->json([
                'sucess'=>true,
                'article' => $article,
                "message" => "Article trouvé"
            ], Response::HTTP_OK);
        }
        else{
            return response()->json([
                'sucess'=>false,
                "message" => "Echec de la recherche"
            ], Response::HTTP_OK);
        }


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
        if(Auth::user()->can('update',User::class,Article::class)){
            $this->articlerepository->update($request->all(),$id);
            return response()->json([
                "sucess" => true,
                "message" => "Article mis à jour"
            ], Response::HTTP_OK);
        }
        else{
            return response()->json([
                "sucess" => false,
                "message" => "Echec de la mise à jour"
            ], Response::HTTP_OK);
        }


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

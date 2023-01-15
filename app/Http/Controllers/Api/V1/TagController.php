<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\TagRequest;
use App\Repositories\TagRepository;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\Api\V1\BaseController;
use Illuminate\Support\Facades\Auth;
class TagController extends BaseController
{
    protected $tagRepository;


    public function __construct(TagRepository $tagrepository)
    {
        $this->tagRepository = $tagrepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        if(Auth::user()->can('viewAny',User::class)){
            $tags = $this->tagRepository->findAll();
            return $this->sendResponse($tags,"Liste des tags");
        }
        else{
            return $this->sendError("Une erreur est survenue", ["Erreur"]);
        }



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
    public function store(TagRequest $request)
    {
        //
        if(Auth::user()->can('create',User::class)){
            $tag = $this->tagRepository->create($request->all());
            return response()->json([
                "sucess"=>true,
                "tag"=>$tag,
                "message"=>"Tag ajouté"
            ],Response::HTTP_CREATED);
        }
        else{
            return response()->json([
                "sucess"=>false,
                "message"=>"Pas autorisé à insérer un Tag"
            ],Response::HTTP_UNAUTHORIZED);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        if(Auth::user()->can('view',User::class,Tag::class)){
            $tag = $this->tagRepository->findById($id);
            return response()->json([
                "sucess"=>true,
                'Tag' => $tag,
                "message" => "Tag trouvé"
            ], Response::HTTP_FOUND);
        }
        else{
            return response()->json([
                "sucess"=>false,
                "message" => "Pas autorisé"
            ], Response::HTTP_UNAUTHORIZED);
        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function edit(Tag $tag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        if(Auth::user()->can('update',User::class,Tag::class)){
            $this->tagRepository->update($request->all(), $id);
            return response()->json([
                "sucess"=>true,
                "message" => "Tag mis à jour"
            ], Response::HTTP_ACCEPTED);
        }
        else{
            return response()->json([
                "sucess"=>false,
                "message" => "Pas autorisé à mettre un tag à jour"
            ], Response::HTTP_UNAUTHORIZED);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        if(Auth::user()->can('delete',User::class,Tag::class)){
            $this->tagRepository->delete($id);
            return response()->json([
                "sucess"=>true,
                "message" => "Tag supprimé"
            ], Response::HTTP_ACCEPTED);
        }
        else{
            return response()->json([
                "sucess"=>false,
                "message" => "Pas autorisé à supprimer un tag"
            ], Response::HTTP_UNAUTHORIZED);
        }

    }
}

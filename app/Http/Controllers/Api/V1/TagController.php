<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Requests\TagRequest;
use App\Repositories\TagRepository;
use Symfony\Component\HttpFoundation\Response;
class TagController extends Controller
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
        $tags = $this->tagRepository->findAll();
        return response()->json([
            "Tag" => $tags,
            "message" => "Liste des tags"
        ], Response::HTTP_OK);

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
        $tag = $this->tagRepository->create($request->all());
        return response()->json([
            "tag"=>$tag,
            "message"=>"Tag ajouté"
        ],Response::HTTP_CREATED);
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
        $tag = $this->tagRepository->findById($id);
        return response()->json([
            'Tag' => $tag,
            "message" => "Tag trouvé"
        ], Response::HTTP_FOUND);
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
        $this->tagRepository->update($request->all(), $id);
        return response()->json([
            "message" => "Tag mis à jour"
        ], Response::HTTP_ACCEPTED);
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
        $this->tagRepository->delete($id);
        return response()->json([
            "message" => "Tag supprimé"
        ], Response::HTTP_ACCEPTED);
    }
}

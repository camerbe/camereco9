<?php
    namespace App\Repositories;

    use App\Models\Categorie;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use Illuminate\Support\Arr;
    use App\Http\Resources\CategorieResource;
    use Carbon\Carbon;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Cache;

    class CategorieRepository extends BaseRepository  {

        public function __construct(Categorie $categorie)
        {
            $this->model = $categorie;
        }
        public function findById($id)
        {
            return  new CategorieResource(parent::findById($id)) ;
        }
        public function delete($id)
        {
            return parent::delete($id);
        }
        public function update(Array $input,$id){
            $input['categorie'] = Str::title($input['categorie']);
            $input['slug'] = Str::slug($input['categorie']);
            return parent::update($input, $id);

        }
        public function create(Array $input){
            $input['categorie'] = Str::title($input['categorie']);
            $input['slug'] = Str::slug($input['categorie']);
            $categorieId= parent::create($input)->id;
            return new CategorieResource($this->findById($categorieId)) ;
            //return $this->findById($categorieId);
        }
        public function findAll(){
            if($categories=Cache::get('categorie-list')){
                return CategorieResource::collection($categories);
            }
            $categories= Categorie::orderBy('categorie','asc')->paginate();
            Cache::set('categorie-list',$categories,Carbon::now()->addMinutes(30));
            return CategorieResource::collection($categories);
        }
        public function findAllAndPaginate(Request $request){
            $page=$request->input('page',default:1);
            $categories=Cache::remember('categorie-list',Carbon::now()->addMinutes(30) , fn ()=>Categorie::orderBy('categorie','asc')->get());        Categorie::orderBy('categorie','asc')->get();
            $total=$categories->count();
            return [
                'data'=>$categories->forPage($page,5)->values(),
                'meta'=>[
                    'total'=>$total,
                    'page'=>$page,
                    'last_page'=>ceil($total/5)
                ]
            ];
        }
    }

<?php
    namespace App\Repositories;

    use App\Models\User;
    use App\Models\Rubrique;
    use Carbon\Carbon;
    use Illuminate\Support\Facades\Cache;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use App\Http\Resources\RubriqueResource;
    use Illuminate\Support\Arr;

    class RubriqueRepository extends BaseRepository  {

        public function __construct(Rubrique $rubrique)
        {
            $this->model = $rubrique;
        }
        public function findById($id)
        {
            return  new RubriqueResource(parent::findById($id));
        }
        public function delete($id)
        {
            return parent::delete($id);
        }
        public function update(Array $input,$id){
            $input['rubrique'] = Str::title($input['rubrique']);
            $input['slug'] = Str::slug($input['rubrique']);
            return parent::update($input, $id);

        }
        public function create(Array $input){
            $input['rubrique'] = Str::title($input['rubrique']);
            $input['slug'] = Str::slug($input['rubrique']);
            $rubriqueId= parent::create($input)->id;
            return  new RubriqueResource($this->findById($rubriqueId)) ;
        }
        public function findAll(){
            if($rubriques=Cache::get('rubrique-list')){
                return RubriqueResource::collection($rubriques);
            }
            $rubriques=Rubrique::orderBy('rubrique','asc')->paginate();
            Cache::set('rubrique-list',$rubriques,Carbon::now()->addMinutes(30));
            return RubriqueResource::collection($rubriques);
         }
    }

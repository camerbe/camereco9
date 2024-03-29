<?php
    namespace App\Repositories;

    use App\Models\Tag;
    use Carbon\Carbon;
    use Illuminate\Support\Facades\Cache;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use App\Http\Resources\RoleResource;
    use Illuminate\Support\Arr;

    class TagRepository extends BaseRepository  {

        public function __construct(Tag $tag)
        {
            $this->model = $tag;
        }
        public function findById($id)
        {
            return  parent::findById($id) ;
        }
        public function delete($id)
        {
            $tag = $this->findById($id);
            $tag->articles()->detach();
            return parent::delete($id);
        }
        public function update(Array $input,$id){
            $input['tag'] = Str::title($input['tag']);
            $input['slug'] = Str::slug($input['tag']);
            return parent::update($input, $id);

        }
        public function create(Array $input){
            $input['tag'] = Str::title($input['tag']);
            $input['slug'] = Str::slug($input['tag']);
            $tagId= parent::create($input)->id;
            return $this->findById($tagId) ;
        }
        public function findAll(){
            if($tags=Cache::get('tag-list')){
                return $tags;
            }
            $tags=Tag::orderBy('tag','asc')->get();
            Cache::set('tag-list',$tags,Carbon::now()->addMinutes(30));
            return $tags;
        }
    }

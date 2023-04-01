<?php
    namespace App\Repositories;

    use App\Http\Resources\PubResource;
    use App\Models\Pub;
    use Carbon\Carbon;

    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use Illuminate\Support\Arr;
    class PubRepository extends BaseRepository  {

        public function __construct(Pub $pub)
        {
            $this->model = $pub;
        }
        public function findById($id)
        {
            return parent::findById($id) ;
        }
        public function delete($id)
        {
            return parent::delete($id);
        }
        public function update(Array $input,$id){
            return parent::update($input, $id);
        }
        public function create(Array $input){
            $pubId= parent::create($input)->id;
            return $this->findById($pubId);

        }
        public function findAll(){
            return Pub::Where('datefinpub','>',now())->orderBy('datefinpub','desc')->paginate();

         }

        public function getPub($dimension){
            return PubResource::collection(Pub::where([
                ['datefinpub', '>', Carbon::now()],
                ['pubs.pub_dimension_id', $dimension]
            ])->orderByDesc('datefinpub')->get());
         }
    }

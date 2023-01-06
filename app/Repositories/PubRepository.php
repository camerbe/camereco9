<?php
    namespace App\Repositories;

    use App\Models\Pub;

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
            return Pub::orderBy('datefinpub','desc')->paginate();

         }
    }

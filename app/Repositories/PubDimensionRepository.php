<?php
    namespace App\Repositories;

    use App\Models\PubDimension;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use Illuminate\Support\Arr;

    class PubDimensionRepository extends BaseRepository  {

        public function __construct(PubDimension $dimension)
        {
            $this->model = $dimension;
        }
        public function findById($id)
        {
            return  parent::findById($id) ;
        }
        public function delete($id)
        {
            return parent::delete($id);
        }
        public function update(Array $input,$id){
            $input['dimension'] = Str::title($input['dimension']);
            return parent::update($input, $id);

        }
        public function create(Array $input){
            $input['dimension'] = Str::title($input['dimension']);

            $dimensionId= parent::create($input)->id;
            return $this->findById($dimensionId) ;
        }
        public function findAll(){
            return PubDimension::orderBy('dimension','asc')->paginate();
        }
    }

<?php
    namespace App\Repositories;

    use App\Models\Categorie;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use Illuminate\Support\Arr;

    class CategorieRepository extends BaseRepository  {

        public function __construct(Categorie $categorie)
        {
            $this->model = $categorie;
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
            $input['categorie'] = Str::title($input['categorie']);
            $input['slug'] = Str::slug($input['categorie']);
            return parent::update($input, $id);

        }
        public function create(Array $input){
            $input['categorie'] = Str::title($input['categorie']);
            $input['slug'] = Str::slug($input['categorie']);
            $categorieId= parent::create($input)->id;
            return $this->findById($categorieId) ;
        }
        public function findAll(){
            return Categorie::orderBy('categorie','asc')->paginate();
        }
    }

<?php
    namespace App\Repositories;

    use App\Models\Article;
    use App\Models\Pays;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use Illuminate\Support\Arr;
    use Carbon\Carbon;
    class ArticleRepository extends BaseRepository  {

        public function __construct(Article $article)
        {
            $this->model = $article;
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

            $pays = Pays::find($input["pays_id "]);
            $titre = $input["titre"];
            $titre = Str::contains(Str::lower($titre), Str::lower($pays->pays)) ? $titre : $pays->pays . ' ' . $titre;
            $titre = Str::contains(Str::lower($titre), Str::lower($pays->country)) ? $titre : $titre .' ' .$pays->country ;

            $input["auteur"]=Str::title($input["auteur"]);
            $input["source"]=Str::title($input["source"]);
            $input["titre"]=Str::title($input["titre"]);
            $input["titre"]=Str::slug($titre);
            $input["dateparution"]=Carbon::parse($input['dateparution'])->format('Y-m-d H:i:s');
            $pubId= parent::create($input)->id;
            return $this->findById($pubId);

        }
        public function findAll(){
            return Pub::orderBy('datefinpub','desc')->paginate();

         }
    }

<?php
    namespace App\Repositories;

    use App\Models\Article;
    use App\Models\Pays;
    use App\Models\User;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use Illuminate\Support\Arr;
    use Carbon\Carbon;
    use App\Http\Resources\ArticleResource;
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
            //dd($input);
            $usr = User::findOrFail($input["user_id"]);
            $fullname = $usr->nom . ' ' . $usr->prenom;

            $pays = Pays::where('code',$input["pays_code"])->first();
            //dd($countries->pays);
            $titre = $input["titre"];
            $titre = Str::contains(Str::lower($titre), Str::lower($pays->pays)) ? $titre : $pays->pays . ' ' . $titre;
            $titre = Str::contains(Str::lower($titre), Str::lower($pays->country)) ? $titre : $titre .' ' .$pays->country ;

            $input["auteur"]=Str::title($input["auteur"]);
            $input["source"]=Str::title($input["source"]);
            $input["titre"]=Str::title($input["titre"]);
            $input["chapeau"] = Str::limit($input["article"], 200);
            $input["slug"]=Str::slug($titre);
            $input["createdBy"]=$fullname;
            $input["lastmodifiedBy"]=$fullname;
            $input["dateparution"]=Carbon::parse($input['dateparution'])->format('Y-m-d H:i:s');
            $articleId= parent::create($input)->id;
            $article=$this->findById($articleId);
            $article->tags()->attach($input['tag']);
            return  $article;

        }
        public function findAll(){
            $articles=  Article::orderBy('dateparution','desc')->paginate();
            return ArticleResource::collection($articles);

         }
    }

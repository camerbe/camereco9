<?php
    namespace App\Repositories;

use App\Http\Resources\ArticleCollection;
use App\Models\Article;
    use App\Models\Pays;
    use App\Models\User;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use Illuminate\Support\Arr;
    use Carbon\Carbon;
    use Html2Text\Html2Text;
    use App\Http\Resources\ArticleResource;

    class ArticleRepository extends BaseRepository  {

        public function __construct(Article $article)
        {
            $this->model = $article;
        }
        public function findById($id)
        {
            return new ArticleResource(parent::findById($id)) ;
            // $article = parent::findById($id);
            // return $article;
        }
        public function delete($id)
        {

            $article = $this->findById($id);
            $article->tags()->detach();
            return parent::delete($id);
        }
        public function update(Array $input,$id){

            $currentArticle = $this->findById($id);
            $user_id = isset($input['user_id'])? $input['user_id']: $currentArticle->user_id;
            //$tags= isset($input['tag'])? $input['tag']: $currentArticle->tags()->get();
            $titre = isset($input["titre"]) ? Str::title($input["titre"]):$currentArticle->titre;
            $auteur = isset($input["auteur"]) ? Str::title($input["auteur"]) : $currentArticle->auteur;
            $source = isset($input["source"]) ? Str::title($input["source"]) : $currentArticle->source;
            $pays_code = isset($input["pays_code"]) ? $input["pays_code"] : $currentArticle->pays_code;
            $categorie_id = isset($input["categorie_id"]) ? $input["categorie_id"] : $currentArticle->categorie_id;
            $photo = isset($input["photo"]) ? $input["photo"] : $currentArticle->photo;
            $dateparution = isset($input["dateparution"]) ? $input["dateparution"] : $currentArticle->dateparution;
            $article = isset($input["article"]) ? $input["article"] : $currentArticle->article;
        //dd($titre);
            //$usr = User::findOrFail($user_id);
            //$fullname = $usr->nom . ' ' . $usr->prenom;
            $titreForSlug = $titre;
            $pays = Pays::where('code',$pays_code)->first();
            $titreForSlug = Str::contains(Str::lower($titreForSlug), Str::lower($pays->pays)) ? $titreForSlug : Str::slug($pays->pays . ' ' . $titreForSlug);
            $titreForSlug = Str::contains(Str::lower($titreForSlug), Str::lower($pays->country)) ? $titreForSlug :Str::slug( $titreForSlug .' ' .$pays->country) ;

            $html=new Html2Text($article);
            $input["source"]=$source;
            $input["titre"]=$titre;
            $input["chapeau"] = Str::limit($html->getText(), 160);
            $input["user_id"] = $user_id;
            $input["pays_code"] = $pays_code;
            $input["categorie_id"] = $categorie_id;
            $input["photo"] = $photo;
            $input["article"] = $article;

            $input["slug"]=$titreForSlug;
            //$input["createdBy"]=$fullname;
            //$input["lastmodifiedBy"]=$fullname;
            $input["dateparution"]=Carbon::parse($dateparution)->format('Y-m-d H:i:s');
            //dd($tags);
            $article=$this->findById($id);
           //$article->tags()->sync($tags);
            return parent::update($input, $id);
        }
        public function create(Array $input){

            $pays = Pays::whereCode($input["pays_code"])->first();
            $titre = $input["titre"];
            $titre = Str::contains(Str::lower($titre), Str::lower($pays->pays)) ? $titre : Str::slug($pays->pays . ' ' . $titre);
            $titre = Str::contains(Str::lower($titre), Str::lower($pays->country)) ? $titre : Str::slug($titre .' ' .$pays->country) ;

            $html=new Html2Text($input["article"]);

            $input["auteur"]=Str::title($input["auteur"]);
            $input["keyword"]=Str::title($input["keyword"]);
            $input["source"]=Str::title($input["source"]);
            $input["titre"]=Str::title($input["titre"]);
            $input["chapeau"] = Str::limit($html->getText(), 160);
            $input["slug"]=$titre;
            $input["dateparution"]=Carbon::parse($input['dateparution'])->format('Y-m-d H:i:s');
            $articleId= parent::create($input)->id;
            return  $this->findById($articleId);

        }
        public function findAll(){
            $articles=  Article::orderBy('dateparution','desc')->paginate();
            return ArticleResource::collection($articles);

        }
        public function getArticleByUserId($userid){
            $articles=  Article::where("user_id",$userid)->orderByDesc('dateparution')->paginate(10);
            return ArticleResource::collection($articles)->response()->getData(true);
        }
        public function getArticleBySlug($slug){
            $articles=  Article::where("slug",$slug)->orderByDesc('dateparution')->get();
            foreach($articles as $article){
                $article->hit++;
                $article->save();
            }
            return ArticleResource::collection($articles);
        }
         public function sameRubrique($pays,$categorie){
            return ArticleResource::collection(Article::where([
                ['pays_code', $pays],
                ['categorie_id', $categorie],
                ['dateparution', '<=', Carbon::now()],
            ])->orderByDesc('dateparution')->take(5)->get());
         }
         public function mostReaded(){
            return ArticleResource::collection(Article::where([
                ['dateparution', '<=', Carbon::now()],
            ])->orderByDesc('hit')->take(5)->get());
         }

    }

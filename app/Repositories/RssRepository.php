<?php
    namespace App\Repositories;

    use App\Http\Resources\ArticleCollection;
    use App\Models\Article;
    use App\Models\Pays;
    use App\Models\User;
    use App\Models\Pub;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use App\Repositories\PubRepository;
    use Illuminate\Support\Arr;
    use Carbon\Carbon;
    use Html2Text\Html2Text;
    use App\Http\Resources\ArticleResource;
    use Willvincent\Feeds;
    use App\Repositories\Rss;


    class RssRepository {

        protected $feeds;
        public function __construct()
        {
            $this->feeds = \Feeds::make('https://www.camer.be/rss');


        }
        public function getRss()
        {
            $rssposts=[];
            $data=array(
                'title'=> $this->feeds->get_title(),
                'permalink'=> $this->feeds->get_permalink(),
                'items'=> $this->feeds->get_items(),
            );
            $items=$data['items'];

            $i=0;
            foreach($items as $item){

                $tmp=[
                    "title"=>$item->get_title(),
                    'description'=>$item->get_description(),
                    'slug'=>$item->get_permalink(),
                    'image'=>$item->get_enclosure()->link,
                    'categorie'=>$item->get_category()->get_term( ),

                ];
                $rssposts[]=$tmp;
                $i++;
                if($i>7){
                    break;
                }

            }
            return collect($rssposts);
        }


    }

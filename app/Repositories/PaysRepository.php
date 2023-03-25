<?php
    namespace App\Repositories;

    use App\Models\Pays;
    use App\Repositories\BaseRepository;
    use Carbon\Carbon;
    use Illuminate\Support\Facades\Cache;
    use Illuminate\Support\Str;
    class PaysRepository extends BaseRepository  {

        public function __construct(Pays $pays){
            $this->model=$pays;
        }
        public function findById($code){
            return Pays::whereCode($code)->first();
        }
        public function delete($id){
            return parent::delete($id);
        }
        public function create(Array $input){


            $input['pays']=strtoupper($input['pays']) ;
            $input['country']=strtoupper($input['country']) ;
            $input['code']=strtoupper($input['code']);
            $code=$input['code'];
            parent::create($input);
            return $this->findById($code);
        }
        public function update(Array $input, $id){
            $input['pays']=strtoupper($input['pays']) ;
            $input['country']=strtoupper($input['country']) ;
            $input['code']=strtoupper($input['code']);
            return parent::update($input, $id);
        }
        public function findAll(){

            //Cache::forget('pays-list');
            if($countries=Cache::get('pays-list')){
                return $countries;
            }
            $countries= Pays::orderBy('pays','asc')->get();
            Cache::set('pays-list',$countries,Carbon::now()->addMinutes(60));
            return $countries;
        }

    }

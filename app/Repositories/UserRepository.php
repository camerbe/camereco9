<?php
    namespace App\Repositories;

    use App\Models\User;
    use App\Models\Role;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use Illuminate\Support\Arr;
use App\Http\Resources\UserResource;

    class UserRepository extends BaseRepository  {

        public function __construct(User $user)
        {
            $this->model = $user;
        }
        public function findById($id)
        {
            return new UserResource(parent::findById($id)) ;
        }
        public function delete($id)
        {
            $usr = $this->findById($id);
            $usr->roles()->detach();
            return parent::delete($id);
        }
        public function update(Array $input,$id){
            $input['nom'] = Str::title($input['nom']);
            $input['prenom'] = Str::title($input['prenom']);
            parent::update($input, $id);

            $usr = $this->findById($id);
            $role=Role::find($input['role']);
            $role_ids=[$role->id];
            $usr->roles()->sync($role_ids);
            return new UserResource($usr);
        }
        public function create(Array $input){
            $input['nom']=Str::title($input['nom']);
            $input['prenom']=Str::title($input['prenom']);
            $input['password']=bcrypt($input['password']);
            $userId= parent::create($input)->id;
            $usr=$this->findById($userId);
            return new UserResource($usr);
        }
        public function findAll(){
            $usrs= User::orderBy('nom','asc')->orderBy('prenom','asc')->paginate();
            return UserResource::collection($usrs);

         }
    }

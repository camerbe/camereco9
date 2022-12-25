<?php
    namespace App\Repositories;

    use App\Models\User;
    use App\Models\Role;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
use App\Http\Resources\RoleResource;
    use Illuminate\Support\Arr;

    class RoleRepository extends BaseRepository  {

        public function __construct(Role $role)
        {
            $this->model = $role;
        }
        public function findById($id)
        {
            return  new RoleResource(parent::findById($id)) ;
        }
        public function delete($id)
        {
            $role = $this->findById($id);
            $role->users()->detach();
            return parent::delete($id);
        }
        public function update(Array $input,$id){
            $input['role'] = Str::title($input['role']);
            $input['slug'] = Str::slug($input['role']);
            $input['shortrole'] = Str::upper($input['shortrole']);
            return parent::update($input, $id);

        }
        public function create(Array $input){
            $input['role'] = Str::title($input['role']);
            $input['slug'] = Str::slug($input['role']);
            $input['shortrole'] = Str::upper($input['shortrole']);
            $roleId= parent::create($input)->id;
            return  new RoleResource($this->findById($roleId)) ;
        }
        public function findAll(){
            $roles=  Role::orderBy('role','asc')->paginate();
            return RoleResource::collection($roles);

         }
    }

<?php
    namespace App\Repositories;

    use App\Models\User;
    use App\Models\Role;
    use Illuminate\Support\Str;
    use App\Repositories\BaseRepository;
    use Illuminate\Support\Arr;

    class RoleRepository extends BaseRepository  {

        public function __construct(Role $role)
        {
            $this->model = $role;
        }
        public function findById($id)
        {
            return parent::findById($id);
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
            $role=$this->findById($roleId);
            return $role;
        }
        public function findAll(){
            //$usrs= User::orderBy('nom','asc')->orderBy('prenom','asc')->paginate();
            return Role::orderBy('role','asc')->paginate();

         }
    }

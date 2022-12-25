<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//use App\Repositories\BaseRepository;
use App\Repositories\UserRepository;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $usr)
    {
        $this->userRepository = $usr;
    }
    public function login(Request $request){

    }
}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\FrontController;
use App\Http\Controllers\Api\V1\RoleController;
use App\Http\Controllers\Api\V1\PaysController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\TagController;
use App\Http\Controllers\Api\V1\CategorieController;
use App\Http\Controllers\Api\V1\PubDimensionController;
use App\Http\Controllers\Api\V1\PubController;
use App\Http\Controllers\Api\V1\RubriqueController;
use App\Http\Controllers\Api\V1\ArticleController;
use App\Http\Controllers\Api\V1\AuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('articles/user/{user}', [ArticleController::class, 'articlebyuser']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResources([
        'roles'      => RoleController::class,
        'users'      => UserController::class,
        'tags'       => TagController::class,
        'categories' => CategorieController::class,
        'rubriques'  => RubriqueController::class,
        'dimensions' => PubDimensionController::class,
        'pubs'       => PubController::class,
        'articles'   => ArticleController::class,
        'pays'       => PaysController::class,


    ]);
});

Route::get('front', [FrontController::class, 'index']);
Route::get('front/{slug}', [FrontController::class, 'show']);
Route::get('front/{pays}/{categorie}', [FrontController::class, 'samerubrique']);
//Route::get('frontend/{slug}', [FrontEndController::class, 'findBySlug']);
Route::post('login', [AuthController::class, 'login']);

// Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['api', 'auth']], function () {
//     \UniSharp\LaravelFilemanager\Lfm::routes();
// });



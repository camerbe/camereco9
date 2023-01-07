<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\RoleController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\TagController;
use App\Http\Controllers\Api\V1\CategorieController;
use App\Http\Controllers\Api\V1\PubDimensionController;
use App\Http\Controllers\Api\V1\PubController;
use App\Http\Controllers\Api\V1\RubriqueController;

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
Route::apiResource('roles', RoleController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('tags', TagController::class);
Route::apiResource('categories', CategorieController::class);
Route::apiResource('rubriques', RubriqueController::class);
Route::apiResource('dimensions', PubDimensionController::class);
Route::apiResource('pubs', PubController::class);


<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        $this->RegisterUserRepo();
        $this->RegisterRoleRepo();
        $this->RegisterTagRepo();
        $this->RegisterCategorieRepo();
        $this->RegisterPubDimensionRepo();
        $this->RegisterPubRepo();
        $this->RegisterRubriqueRepo();
        $this->RegisterArticleRepo();
    }

    public function RegisterUserRepo(){
        return $this->app->bind('App\Repositories\BaseRepository','App\Repositories\UserRepository');
    }
    public function RegisterRoleRepo(){
        return $this->app->bind('App\Repositories\BaseRepository','App\Repositories\RoleRepository');
    }
    public function RegisterTagRepo(){
        return $this->app->bind('App\Repositories\BaseRepository','App\Repositories\TagRepository');
    }
    public function RegisterCategorieRepo(){
        return $this->app->bind('App\Repositories\BaseRepository','App\Repositories\CategorieRepository');
    }
    public function RegisterPubDimensionRepo(){
        return $this->app->bind('App\Repositories\BaseRepository','App\Repositories\PubDimensionRepository');
    }
    public function RegisterPubRepo(){
        return $this->app->bind('App\Repositories\BaseRepository','App\Repositories\PubDimensionRepository');
    }
    public function RegisterRubriqueRepo(){
        return $this->app->bind('App\Repositories\BaseRepository','App\Repositories\RubriqueRepository');
    }
    public function RegisterArticleRepo(){
        return $this->app->bind('App\Repositories\BaseRepository','App\Repositories\ArticleRepository');
    }
}

<?php

namespace App\Policies;

use Illuminate\Support\Arr;
use App\Models\Article;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ArticlePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        //
        //dd(true);
       return true;
        $usr = User::find($user->id);
        $role = $usr->roles()->first();
        $art=$usr->articles()->first();
        return ($art->user_id === $user->id)||($role->shortrole=='ADM');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Article $article)
    {
        //
        $usr = User::find($user->id);
        $role = $usr->roles()->first();
        $art=$usr->articles()->first();
        return ($art->user_id=$user->id)||($role->shortrole=='ADM');

    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        //

        $usr = User::find($user->id);
        $role = $usr->roles()->first();
        return ($usr->id=$user->id)||($role->shortrole=='ADM');

    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Article $article)
    {
        //
        $usr = User::find($user->id);
        $role = $usr->roles()->first();
        return ($article->user_id=$user->id)||($role->shortrole=='ADM');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Article $article)
    {
        //
        $usr = User::find($user->id);
        $role = $usr->roles()->first();
        return ($article->user_id=$user->id)||($role->shortrole=='ADM');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Article $article)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Article $article)
    {
        //
    }
}

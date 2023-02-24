<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Article
 *
 * @property int $id
 * @property string $auteur
 * @property string $source
 * @property string $titre
 * @property int $hit
 * @property string $chapeau
 * @property string $slug
 * @property int $user_id
 * @property string $pays_code
 * @property int $categorie_id
 * @property string $photo
 * @property string $dateparution
 * @property string $article
 * @property string|null $createdBy
 * @property string|null $lastmodifiedBy
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Categorie $categorie
 * @property-read \App\Models\Pays|null $countries
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Tag> $tags
 * @property-read int|null $tags_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Article newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Article newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Article query()
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereArticle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereAuteur($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereCategorieId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereChapeau($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereDateparution($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereHit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereLastmodifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article wherePaysCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereSource($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereTitre($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Article whereUserId($value)
 */
	class Article extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Categorie
 *
 * @property int $id
 * @property string $categorie
 * @property int $rubrique_id
 * @property string $slug
 * @property string|null $createdBy
 * @property string|null $lastmodifiedBy
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Article> $articles
 * @property-read int|null $articles_count
 * @property-read \App\Models\Rubrique $rubrique
 * @method static \Illuminate\Database\Eloquent\Builder|Categorie newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Categorie newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Categorie query()
 * @method static \Illuminate\Database\Eloquent\Builder|Categorie whereCategorie($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Categorie whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Categorie whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Categorie whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Categorie whereLastmodifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Categorie whereRubriqueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Categorie whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Categorie whereUpdatedAt($value)
 */
	class Categorie extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Pays
 *
 * @property string $code
 * @property string $pays
 * @property string $country
 * @property string|null $createdBy
 * @property string|null $lastmodifiedBy
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Article> $articles
 * @property-read int|null $articles_count
 * @method static \Illuminate\Database\Eloquent\Builder|Pays newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pays newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pays query()
 * @method static \Illuminate\Database\Eloquent\Builder|Pays whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pays whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pays whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pays whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pays whereLastmodifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pays wherePays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pays whereUpdatedAt($value)
 */
	class Pays extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Pub
 *
 * @property int $id
 * @property string $datefinpub
 * @property string|null $lien
 * @property string|null $editeur
 * @property string $photo
 * @property int $pub_dimension_id
 * @property string|null $createdBy
 * @property string|null $lastmodifiedBy
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PubDimension> $dimensions
 * @property-read int|null $dimensions_count
 * @method static \Illuminate\Database\Eloquent\Builder|Pub newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pub newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pub query()
 * @method static \Illuminate\Database\Eloquent\Builder|Pub whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pub whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pub whereDatefinpub($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pub whereEditeur($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pub whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pub whereLastmodifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pub whereLien($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pub wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pub wherePubDimensionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pub whereUpdatedAt($value)
 */
	class Pub extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PubDimension
 *
 * @property int $id
 * @property string $dimension
 * @property string|null $createdBy
 * @property string|null $lastmodifiedBy
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Pub|null $pub
 * @method static \Illuminate\Database\Eloquent\Builder|PubDimension newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PubDimension newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PubDimension query()
 * @method static \Illuminate\Database\Eloquent\Builder|PubDimension whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PubDimension whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PubDimension whereDimension($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PubDimension whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PubDimension whereLastmodifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PubDimension whereUpdatedAt($value)
 */
	class PubDimension extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Role
 *
 * @property int $id
 * @property string $role
 * @property string $slug
 * @property string $shortrole
 * @property string|null $createdBy
 * @property string|null $lastmodifiedBy
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereLastmodifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereShortrole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereUpdatedAt($value)
 */
	class Role extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Rubrique
 *
 * @property int $id
 * @property string $rubrique
 * @property string $slug
 * @property string|null $createdBy
 * @property string|null $lastmodifiedBy
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Categorie> $categories
 * @property-read int|null $categories_count
 * @method static \Illuminate\Database\Eloquent\Builder|Rubrique newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rubrique newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rubrique query()
 * @method static \Illuminate\Database\Eloquent\Builder|Rubrique whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rubrique whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rubrique whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rubrique whereLastmodifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rubrique whereRubrique($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rubrique whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rubrique whereUpdatedAt($value)
 */
	class Rubrique extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Tag
 *
 * @property int $id
 * @property string $tag
 * @property string $slug
 * @property string|null $createdBy
 * @property string|null $lastmodifiedBy
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Article> $articles
 * @property-read int|null $articles_count
 * @method static \Illuminate\Database\Eloquent\Builder|Tag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag query()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereLastmodifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereUpdatedAt($value)
 */
	class Tag extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $nom
 * @property string $prenom
 * @property string $email
 * @property int $suspended
 * @property string $password
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $remember_token
 * @property string|null $createdBy
 * @property string|null $lastmodifiedBy
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Article> $articles
 * @property-read int|null $articles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Passport\Client> $clients
 * @property-read int|null $clients_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Passport\Token> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastmodifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePrenom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereSuspended($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 */
	class User extends \Eloquent implements \Illuminate\Contracts\Auth\MustVerifyEmail {}
}


<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\HasApiTokens;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Carbon\Carbon;
use Laravel\Passport\Passport;
class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
         'App\Models\Article' => 'App\Policies\ArticlePolicy',
         'App\Models\User' => 'App\Policies\UserPolicy',
         'App\Models\Role' => 'App\Policies\RolePolicy',
         'App\Models\Tag' => 'App\Policies\TagPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new MailMessage)
                ->subject("Vérifier l'adresse e-mail")
                ->line('Cliquez sur le bouton ci-dessous pour vérifier votre adresse e-mail.')
                ->action("Vérifier l'adresse e-mail", $url);
        });
        //
        Passport::tokensExpireIn(now()->addMinutes(30));
    }
}

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { AuthService } from './shared/services/auth.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './dashboard/user/user.component';
import { UserService } from './shared/services/user.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { UserCreationComponent } from './dashboard/user/user-creation/user-creation.component';
import { UserStartComponent } from './dashboard/user/user-start/user-start.component';
import { PubComponent } from './dashboard/pub/pub.component';
import { PubStartComponent } from './dashboard/pub/pub-start/pub-start.component';
import { DimensionComponent } from './dashboard/dimension/dimension.component';
import { DimensionStartComponent } from './dashboard/dimension/dimension-start/dimension-start.component';
import { DimensionCreationComponent } from './dashboard/dimension/dimension-creation/dimension-creation.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { PubCreationComponent } from './dashboard/pub/pub-creation/pub-creation.component';
import * as fr  from '@angular/common/locales/fr-BE'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertComponent } from './shared/components/sweet-alert/sweet-alert.component';
import { RubriqueComponent } from './dashboard/rubrique/rubrique.component';
import { RubriqueStartComponent } from './dashboard/rubrique/rubrique-start/rubrique-start.component';
import { RubriqueCreationComponent } from './dashboard/rubrique/rubrique-creation/rubrique-creation.component';
import { CategorieComponent } from './dashboard/categorie/categorie.component';
import { CategorieStartComponent } from './dashboard/categorie/categorie-start/categorie-start.component';
import { CategorieCreationComponent } from './dashboard/categorie/categorie-creation/categorie-creation.component';
import { RoleComponent } from './dashboard/role/role.component';
import { RoleCreationComponent } from './dashboard/role/role-creation/role-creation.component';
import { RoleStartComponent } from './dashboard/role/role-start/role-start.component';
import { PaysStartComponent } from './dashboard/pays/pays-start/pays-start.component';
import { PaysCreationComponent } from './dashboard/pays/pays-creation/pays-creation.component';
import { PaysComponent } from './dashboard/pays/pays.component';
import { ArticleStartComponent } from './dashboard/article/article-start/article-start.component';
import { ArticleCreationComponent } from './dashboard/article/article-creation/article-creation.component';
import { ArticleComponent } from './dashboard/article/article.component';
import { TagComponent } from './dashboard/tag/tag/tag.component';
import { TagStartComponent } from './dashboard/tag/tag-start/tag-start.component';
import { TagCreationComponent } from './dashboard/tag/tag-creation/tag-creation.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import { AdsenseModule } from 'ng2-adsense';
import { FrontEndArticleComponent } from './front-end-article/front-end-article.component';
import { AdvertComponent } from './shared/components/advert/advert.component';
import { PlusLuComponent } from './shared/components/plus-lu/plus-lu.component';
import { RssComponent } from './shared/components/rss/rss.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    UserCreationComponent,
    UserStartComponent,
    PubComponent,
    PubStartComponent,
    DimensionComponent,
    DimensionStartComponent,
    DimensionCreationComponent,
    PubCreationComponent,
    SweetAlertComponent,
    RubriqueComponent,
    RubriqueStartComponent,
    RubriqueCreationComponent,
    CategorieComponent,
    CategorieStartComponent,
    CategorieCreationComponent,
    RoleComponent,
    RoleCreationComponent,
    RoleStartComponent,
    PaysStartComponent,
    PaysCreationComponent,
    PaysComponent,
    ArticleStartComponent,
    ArticleCreationComponent,
    ArticleComponent,
    TagComponent,
    TagStartComponent,
    TagCreationComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    SiteLayoutComponent,
    HomeComponent,
    FrontEndArticleComponent,
    AdvertComponent,
    PlusLuComponent,
    RssComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    EditorModule,
    SweetAlert2Module.forRoot(),
    AdsenseModule.forRoot({
      adClient:'ca-pub-8638642715460968',

    })
  ],
  providers: [
    UserService,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'fr-BE' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   *
   */
  constructor() {
    registerLocaleData(fr.default)

  }
}

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


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    EditorModule,
    SweetAlert2Module.forRoot()
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

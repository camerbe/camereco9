import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AuthService } from './shared/auth.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './dashboard/user/user.component';
import { DataService } from './shared/data.service';
import { UserService } from './shared/user.service';
import { CommonModule } from '@angular/common';
import { UserCreationComponent } from './dashboard/user/user-creation/user-creation.component';
import { UserStartComponent } from './dashboard/user/user-start/user-start.component';
import { PubComponent } from './dashboard/pub/pub.component';
import { PubStartComponent } from './dashboard/pub/pub-start/pub-start.component';
import { DimensionComponent } from './dashboard/dimension/dimension.component';
import { DimensionStartComponent } from './dashboard/dimension/dimension-start/dimension-start.component';
import { DimensionCreationComponent } from './dashboard/dimension/dimension-creation/dimension-creation.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { PubCreationComponent } from './dashboard/pub/pub-creation/pub-creation.component';



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
    PubCreationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    EditorModule
  ],
  providers: [
    UserService,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

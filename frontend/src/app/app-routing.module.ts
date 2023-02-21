import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DimensionCreationComponent } from './dashboard/dimension/dimension-creation/dimension-creation.component';
import { DimensionStartComponent } from './dashboard/dimension/dimension-start/dimension-start.component';
import { DimensionComponent } from './dashboard/dimension/dimension.component';
import { PubCreationComponent } from './dashboard/pub/pub-creation/pub-creation.component';
import { PubStartComponent } from './dashboard/pub/pub-start/pub-start.component';
import { PubComponent } from './dashboard/pub/pub.component';
import { UserCreationComponent } from './dashboard/user/user-creation/user-creation.component';
import { UserStartComponent } from './dashboard/user/user-start/user-start.component';
import { UserComponent } from './dashboard/user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path:'',
    title: 'login',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'login',
    title: 'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,children:[
      {
        path:'',
        component:UserStartComponent,children:[
          {
            path:'',redirectTo:'user',
            title: 'liste des administrateurs',
            pathMatch:'full'

          },
          {
            path:'user',
            title: 'liste des administrateurs',
            component:UserComponent
          },
          {
            path:'user/add',
            title: 'Ajout administrateur',
            component:UserCreationComponent
          },
          {
            path:'user/:id',
            title: 'Cherche  administrateur',
            component:UserComponent
          },
        ]
      },
      {
        path:'',
        component:DimensionStartComponent,children:[
          {
            path:'',redirectTo:'dimension',
            title: 'liste des dimensions',
            pathMatch:'full'

          },
          {
            path:'dimension',
            title: 'liste des dimensions',
            component:DimensionComponent
          },
          {
            path:'dimension/add',
            title: 'Ajout des dimensions',
            component:DimensionCreationComponent
          },
          {
            path:'dimension/:id',
            title: 'Cherche  dimension',
            component:DimensionComponent
          },
          {
            path:'dimension/edit/:id',
            title: 'Edition  dimension',
            component:DimensionCreationComponent
          }
        ]
      },
      {
        path:'',
        component:PubStartComponent,children:[
          {
            path:'',redirectTo:'pub',
            title: 'liste des publicités',
            pathMatch:'full'

          },
          {
            path:'pub',
            title: 'liste des publicités',
            component:PubComponent
          },
          {
            path:'pub/add',
            title: 'Ajout des publicités',
            component:PubCreationComponent
          },
          {
            path:'pub/:id',
            title: 'Cherche  publicités',
            component:PubComponent
          },
          {
            path:'pub/edit/:id',
            title: 'Edition  publicités',
            component:PubCreationComponent
          }
        ]
      }


    ],
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

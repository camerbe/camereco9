import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DimensionCreationComponent } from './dashboard/dimension/dimension-creation/dimension-creation.component';
import { DimensionStartComponent } from './dashboard/dimension/dimension-start/dimension-start.component';
import { DimensionComponent } from './dashboard/dimension/dimension.component';
import { PubStartComponent } from './dashboard/pub/pub-start/pub-start.component';
import { PubComponent } from './dashboard/pub/pub.component';
import { UserCreationComponent } from './dashboard/user/user-creation/user-creation.component';
import { UserStartComponent } from './dashboard/user/user-start/user-start.component';
import { UserComponent } from './dashboard/user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'login',
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
            pathMatch:'full'

          },
          {
            path:'user',
            component:UserComponent
          },
          {
            path:'user/add',
            component:UserCreationComponent
          },
          {
            path:'user/:i',
            component:UserComponent
          },
        ]
      },
      {
        path:'',
        component:DimensionStartComponent,children:[
          {
            path:'',redirectTo:'dimension',
            pathMatch:'full'

          },
          {
            path:'dimension',
            component:DimensionComponent
          },
          {
            path:'dimension/add',
            component:DimensionCreationComponent
          },
          {
            path:'dimension/:i',
            component:DimensionComponent
          },
        ]
      },
      {
        path:'',
        component:PubStartComponent,children:[
          {
            path:'',redirectTo:'pub',
            pathMatch:'full'

          },
          {
            path:'pub',
            component:PubComponent
          },
          // {
          //   path:'user/add',
          //   component:UserCreationComponent
          // },
          // {
          //   path:'user/:i',
          //   component:UserComponent
          // },
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

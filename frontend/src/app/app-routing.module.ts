import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieCreationComponent } from './dashboard/categorie/categorie-creation/categorie-creation.component';
import { CategorieStartComponent } from './dashboard/categorie/categorie-start/categorie-start.component';
import { CategorieComponent } from './dashboard/categorie/categorie.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DimensionCreationComponent } from './dashboard/dimension/dimension-creation/dimension-creation.component';
import { DimensionStartComponent } from './dashboard/dimension/dimension-start/dimension-start.component';
import { DimensionComponent } from './dashboard/dimension/dimension.component';
import { PaysCreationComponent } from './dashboard/pays/pays-creation/pays-creation.component';
import { PaysStartComponent } from './dashboard/pays/pays-start/pays-start.component';
import { PaysComponent } from './dashboard/pays/pays.component';
import { PubCreationComponent } from './dashboard/pub/pub-creation/pub-creation.component';
import { PubStartComponent } from './dashboard/pub/pub-start/pub-start.component';
import { PubComponent } from './dashboard/pub/pub.component';
import { RoleCreationComponent } from './dashboard/role/role-creation/role-creation.component';
import { RoleStartComponent } from './dashboard/role/role-start/role-start.component';
import { RoleComponent } from './dashboard/role/role.component';
import { RubriqueCreationComponent } from './dashboard/rubrique/rubrique-creation/rubrique-creation.component';
import { RubriqueStartComponent } from './dashboard/rubrique/rubrique-start/rubrique-start.component';
import { RubriqueComponent } from './dashboard/rubrique/rubrique.component';
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
          {
            path:'user/edit/:id',
            title: 'Edition  administrateur',
            component:UserCreationComponent
          }
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
            title: 'liste des publicit??s',
            pathMatch:'full'

          },
          {
            path:'pub',
            title: 'liste des publicit??s',
            component:PubComponent
          },
          {
            path:'pub/add',
            title: 'Ajout des publicit??s',
            component:PubCreationComponent
          },
          {
            path:'pub/:id',
            title: 'Cherche  publicit??s',
            component:PubComponent
          },
          {
            path:'pub/edit/:id',
            title: 'Edition  publicit??s',
            component:PubCreationComponent
          }
        ]
      },
      {
        path:'',
        component:RubriqueStartComponent,children:[
          {
            path:'',redirectTo:'rubrique',
            title: 'liste des rubriques',
            pathMatch:'full'

          },
          {
            path:'rubrique',
            title: 'liste des rubriques',
            component:RubriqueComponent
          },
          {
            path:'rubrique/add',
            title: 'Ajout des rubriques',
            component:RubriqueCreationComponent
          },
          {
            path:'rubrique/:id',
            title: 'Cherche  rubriques',
            component:RubriqueComponent
          },
          {
            path:'rubrique/edit/:id',
            title: 'Edition  rubriques',
            component:RubriqueCreationComponent
          }
        ]
      },
      {
        path:'',
        component:CategorieStartComponent,children:[
          {
            path:'',redirectTo:'categorie',
            title: 'liste des categories',
            pathMatch:'full'

          },
          {
            path:'categorie',
            title: 'liste des categories',
            component:CategorieComponent
          },
          {
            path:'categorie/add',
            title: 'Ajout des categories',
            component:CategorieCreationComponent
          },
          {
            path:'categorie/:id',
            title: 'Cherche  categories',
            component:CategorieComponent
          },
          {
            path:'categorie/edit/:id',
            title: 'Edition  categories',
            component:CategorieCreationComponent
          }
        ]
      },
      {
        path:'',
        component:RoleStartComponent,children:[
          {
            path:'',redirectTo:'role',
            title: 'liste des roles',
            pathMatch:'full'

          },
          {
            path:'role',
            title: 'liste des roles',
            component:RoleComponent
          },
          {
            path:'role/add',
            title: 'Ajout des roles',
            component:RoleCreationComponent
          },
          {
            path:'role/:id',
            title: 'Cherche  roles',
            component:RoleComponent
          },
          {
            path:'role/edit/:id',
            title: 'Edition  roles',
            component:RoleCreationComponent
          }
        ]
      },
      {
        path:'',
        component:PaysStartComponent,children:[
          {
            path:'',redirectTo:'pays',
            title: 'liste des pays',
            pathMatch:'full'

          },
          {
            path:'pays',
            title: 'liste des pays',
            component:PaysComponent
          },
          {
            path:'pays/add',
            title: 'Ajout des pays',
            component:PaysCreationComponent
          },
          {
            path:'pays/:code',
            title: 'Cherche  pays',
            component:PaysComponent
          },
          {
            path:'pays/edit/:code',
            title: 'Edition  pays',
            component:PaysCreationComponent
          }
        ]
      },

    ],
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

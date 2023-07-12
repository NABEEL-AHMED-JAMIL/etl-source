import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
// compoenet
import {
  MainLayoutComponent,
  AdminLayoutComponent
} from './_layout';
import { 
  LoginComponent, 
  ForgotPassComponent,
  ResetPassComponent,
  PageNotFoundComponent,
  ETLSourceComponent, // dashboard
  DBQueryComponent,
  XMLQueryComponent,
  MGCredentialComponent,
  MGLookupComponent,
  MgTemplateComponent,
  MGFormComponent,
  MGSectionComponent,
  MGControlComponent,
  MGUsersComponent,
  MYProfileComponent,
  MgSourceTaskComponent,
  MGSourceTaskTypeComponent,
  SettingDashboardComponent
} from './_pages';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotpass',
    component: ForgotPassComponent
  },
  {
    path: 'resetpass',
    component: ResetPassComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data:  {
      role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER' ]
  },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: ETLSourceComponent,
        data:  {
          breadcrumb: 'Dashboard',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER' ]
        }
      }
    ]
  },
  {
    path: 'main',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data:  {
      main: true,
      breadcrumb: 'Main',
      role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER' ]
    },
    children: [
      {
        path: 'dbQuery',
        component: DBQueryComponent,
        canActivate: [AuthGuard],
        data:  {
          main: false,
          breadcrumb: 'DB Query',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN' ],
        }
      },
      {
        path: 'xmlQuery',
        component: XMLQueryComponent,
        canActivate: [AuthGuard],
        data:  {
          main: false,
          breadcrumb: 'XML Query',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN' ],
        }
      }
    ]
  },
  {
    path: 'setting',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data:  {
      breadcrumb: 'Setting',
      role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
    },
    children: [
      {
        path: '',
        component: SettingDashboardComponent,
        canActivate: [AuthGuard],
        data:  {
          admin: true,
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
        }
      },
      {
        path: 'mgCredential',
        component: MGCredentialComponent,
        canActivate: [AuthGuard],
        data:  {
          admin: false,
          breadcrumb: 'MG Credential',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
        }
      },
      {
        path: 'mgLookup',
        component: MGLookupComponent,
        canActivate: [AuthGuard],
        data:  {
          admin: false,
          parent: true,
          breadcrumb: 'My Lookup',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
        }
      },
      {
        path: 'mgSubLookup',
        component: MGLookupComponent,
        canActivate: [AuthGuard],
        data:  {
          admin: false,
          parent: false,
          breadcrumb: 'My Sub Lookup',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
        }
      },
      {
        path: 'mgTemplate',
        component: MgTemplateComponent,
        canActivate: [AuthGuard],
        data:  {
          admin: false,
          breadcrumb: 'Mg Template',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
        }
      },
      {
        path: 'mgForm',
        component: MGFormComponent,
        canActivate: [AuthGuard],
        data:  {
          admin: false,
          breadcrumb: 'MG Form',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
        }
      },
      {
        path: 'mgSection',
        component: MGSectionComponent,
        canActivate: [AuthGuard],
        data:  {
          admin: false,
          breadcrumb: 'MG Sectionl',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
        }
      },
      {
        path: 'mgControl',
        component: MGControlComponent,
        canActivate: [AuthGuard],
        data:  {
          admin: false,
          breadcrumb: 'MG Control',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
        }
      },
      {
        path: 'mgUsers',
        component: MGUsersComponent,
        canActivate: [AuthGuard],
        data:  {
          admin: false,
          breadcrumb: 'MG Users',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
        }
      },
      {
        path: 'mgSourceTask',
        component: MgSourceTaskComponent,
        canActivate: [AuthGuard],
        data:  {
          admin: false,
          breadcrumb: 'MG Source Task',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
        }
      },
      {
        path: 'mgSourceTaskType',
        component: MGSourceTaskTypeComponent,
        canActivate: [AuthGuard],
        data:  {
          admin: false,
          breadcrumb: 'MG Source TaskType',
          role: [ 'ROLE_MASTER_ADMIN', 'ROLE_ADMIN']
        }
      }
    ]
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

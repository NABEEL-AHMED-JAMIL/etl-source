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
    RegisterComponent,
    ETLSourceComponent,
    PageNotFoundComponent,
    SettingDashboardComponent,
    XMLQueryComponent,
    DBQueryComponent,
    MGLookupComponent,
    MgTemplateComponent,
    MgRefreshTokenComponent,
    MgRPPComponent,
    UpdateProfileComponent,
    MgEVariableComponent,
    MgGroupComponent,
    MgUserComponent
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
        path: 'register',
        component: RegisterComponent
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
        data: {
            roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
            permission: ['MAIN_PAGE_PERMISSION']
        },
        children: [
            {
                path: 'dashboard',
                canActivate: [AuthGuard],
                component: ETLSourceComponent,
                data: {
                    breadcrumb: 'Dashboard',
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['MAIN_PAGE_PERMISSION']
                }
            },
            {
                path: 'user/myProfile',
                canActivate: [AuthGuard],
                component: UpdateProfileComponent,
                data: {
                    breadcrumb: 'Profile',
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['UPDATE_PROFILE_PERMISSION']
                }
            }
        ]
    },
    {
        path: 'setting',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Setting',
            roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_DEV'],
            permission: ['ADMIN_PAGE_PERMISSION'],
        },
        children: [
            {
                path: '',
                component: SettingDashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    admin: true,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_DEV'],
                    permission: ['ADMIN_PAGE_PERMISSION']
                }
            },
            {
                path: 'mgUsers',
                component: MgUserComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                    permission: ['USER_PERMISSION'],
                    breadcrumb: 'Mg User',
                }
            },
            {
                path: 'mgGroup',
                component: MgGroupComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                    permission: ['GROUP_PERMISSION'],
                    breadcrumb: 'User Group',
                }
            },
            {
                path: 'mgRPPToken',
                component: MgRPPComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_DEV'],
                    permission: ['RPP_PERMISSION'],
                    breadcrumb: 'Roler & Profile',
                }
            },
            {
                path: 'mgRefreshToken',
                component: MgRefreshTokenComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN'],
                    permission: ['REFRESH_TOKEN_PERMISSION'],
                    breadcrumb: 'Refresh Token',
                }
            },
            {
                path: 'dynamicPayload',
                component: XMLQueryComponent,
                canActivate: [AuthGuard],
                data: {
                    admin: true,
                    breadcrumb: 'Dynamic Payload',
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                    permission: ['DYNAMIC_PAYLOAD_PERMISSION']
                }
            },
            {
                path: 'mgLookup',
                component: MGLookupComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: true,
                    roles: ['ROLE_DEV'],
                    permission: ['LOOKUP_PERMISSION'],
                    breadcrumb: 'My Lookup',
                },
            },
            {
                path: 'mgSubLookup',
                component: MGLookupComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_DEV'],
                    permission: ['LOOKUP_PERMISSION'],
                    breadcrumb: 'Sub Lookup',
                },
            },
            {
                path: 'mgTemplate',
                component: MgTemplateComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_DEV'],
                    permission: ['TEMPLATE_PERMISSION'],
                    breadcrumb: 'Template',
                }
            },
            {
                path: 'mgEvariable',
                component: MgEVariableComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_DEV'],
                    permission: ['EVARIABL_PERMISSION'],
                    breadcrumb: 'E-Variable',
                }
            },
            {
                path: 'inquery',
                component: DBQueryComponent,
                canActivate: [AuthGuard],
                data: {
                    admin: true,
                    breadcrumb: 'Query Inquiry',
                    roles: ['ROLE_DEV'],
                    permission: ['QUERY_INQUIRY_PERMISSION']
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

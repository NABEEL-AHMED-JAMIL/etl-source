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
    MgUserComponent,
    CredentialComponent,
    MGFormComponent,
    MGSectionComponent,
    MgControlComponent,
    MgPlayGroundComponent,
    MgSourceTaskComponent,
    MgSourceTaskTypeComponent
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
            roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER', 'ROLE_DEV'],
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
            // service-setting => source task
            {
                path: 'mgSourceTask',
                component: MgSourceTaskComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                    permission: ['SOURCE_CREDENTAIL_PERMISSION'],
                    breadcrumb: 'Mg Credentail',
                }
            },
            // service-setting => source task type
            {
                path: 'mgSourceTaskType',
                component: MgSourceTaskTypeComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                    permission: ['SOURCE_CREDENTAIL_PERMISSION'],
                    breadcrumb: 'Mg Credentail',
                }
            },
            // service-setting => credentail
            {
                path: 'mgCredentail',
                component: CredentialComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                    permission: ['SOURCE_CREDENTAIL_PERMISSION'],
                    breadcrumb: 'Mg Credentail',
                }
            },
            // form-setting => form
            {
                path: 'mgForm',
                component: MGFormComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                    permission: ['FORM_PERMISSION'],
                    breadcrumb: 'Mg Form',
                }
            },
            // form-setting => section
            {
                path: 'mgSection',
                component: MGSectionComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                    permission: ['SECTION_PERMISSION'],
                    breadcrumb: 'Mg Section',
                }
            },
            // form-setting => control
            {
                path: 'mgControl',
                component: MgControlComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                    permission: ['CONTROL_PERMISSION'],
                    breadcrumb: 'Mg Control',
                }
            },
            // profile-setting => mg-refresh token
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
            // form-setting => play-ground
            {
                path: 'mgPlayGround',
                component: MgPlayGroundComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN'],
                    permission: ['PLAY_GROUND_PERMISSION'],
                    breadcrumb: 'Mg PlayGround',
                }
            },
            // profile-setting => mg-users
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
            // profile-setting => mg-rpp
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
            // profile-setting => mg-refresh token
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
            // app-setting -> lookup
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
            // app-setting -> sub-lookup
            {
                path: 'mgLookup/mgSubLookup',
                component: MGLookupComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_DEV'],
                    permission: ['LOOKUP_PERMISSION'],
                    breadcrumb: 'Sub Lookup',
                },
            },
            // app-setting -> template
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
            // app-setting -> evariable
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
            // support -> inquery
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

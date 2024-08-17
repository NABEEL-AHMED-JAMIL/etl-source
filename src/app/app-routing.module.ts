import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
// compoenet
import {
    MainLayoutComponent,
    AdminLayoutComponent,
    ReportLayoutComponent
} from './_layout';
import {
    LoginComponent,
    ForgotPassComponent,
    ResetPassComponent,
    RegisterComponent,
    ETLSourceComponent,
    PageNotFoundComponent,
    SettingDashboardComponent,
    DynamicPayloadQueryComponent,
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
    MgSourceTaskTypeComponent,
    MgReportComponent,
    MgDashboardComponent,
    MgOLAPComponent,
    ViewReportComponent,
    ViewDashboardComponent,
    MgEventBridgeComponent,
    EVConfigComponent,
    MgOrgComponent
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
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER', 'ROLE_DEV'],
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
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['SOURCE_TASK_PERMISSION'],
                    breadcrumb: 'Mg Source Task',
                }
            },
            // service-setting => source task type
            {
                path: 'mgSourceTaskType',
                component: MgSourceTaskTypeComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['SOURCE_TASKTYPE_PERMISSION'],
                    breadcrumb: 'Mg Source Task Type',
                }
            },
            {
                path: 'mgDashboard',
                component: MgDashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['MANAGE_DASHBOARD_PERMISSION'],
                    breadcrumb: 'Mg Dashboard',
                }
            },
            {
                path: 'mgReport',
                component: MgReportComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['MANAGE_REPORT_PERMISSION'],
                    breadcrumb: 'Mg Report',
                }
            },
            {
                path: 'mgOLAP',
                component: MgOLAPComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['MANAGE_OLAP_PERMISSION'],
                    breadcrumb: 'Mg OLAP',
                }
            },
            // form-setting => form
            {
                path: 'mgForm',
                component: MGFormComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
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
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
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
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['CONTROL_PERMISSION'],
                    breadcrumb: 'Mg Control',
                }
            },
            {
                path: 'evConfig',
                component: EVConfigComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['ENABLE_AND_VISIBLE_CONTROL_PERMISSION'],
                    breadcrumb: 'Enable & Visible',
                }
            },
            // profile-setting => mg-refresh token
            {
                path: 'dynamicPayload',
                component: DynamicPayloadQueryComponent,
                canActivate: [AuthGuard],
                data: {
                    admin: true,
                    breadcrumb: 'Dynamic Payload',
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
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
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
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
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_DEV'],
                    permission: ['USER_PERMISSION'],
                    breadcrumb: 'Mg User',
                }
            },
            {
                path: 'mgOrganization',
                component: MgOrgComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_DEV'],
                    permission: ['USER_PERMISSION'],
                    breadcrumb: 'Mg Organization',
                }
            },
            // profile-setting => mg-rpp
            {
                path: 'mgRPP',
                component: MgRPPComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_DB', 'ROLE_DEV'],
                    permission: ['RPP_PERMISSION'],
                    breadcrumb: 'Role & Profile',
                }
            },
            // profile-setting => mg-refresh token
            {
                path: 'mgRefreshToken',
                component: MgRefreshTokenComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_DEV'],
                    permission: ['REFRESH_TOKEN_PERMISSION'],
                    breadcrumb: 'Refresh Token',
                }
            },
            // service-setting => credentail
            {
                path: 'mgCredentail',
                component: CredentialComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['SOURCE_CREDENTAIL_PERMISSION'],
                    breadcrumb: 'Mg Credentail',
                }
            },
            {
                path: 'mgEventBridge',
                component: MgEventBridgeComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: false,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['EVENT_BRIDGE_PERMISSION'],
                    breadcrumb: 'Mg Event Bridge',
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
                    breadcrumb: 'Mg E-Variable',
                }
            },
            // app-setting -> lookup
            {
                path: 'mgLookup',
                component: MGLookupComponent,
                canActivate: [AuthGuard],
                data: {
                    parent: true,
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
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
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
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
                    breadcrumb: 'Mg Template',
                }
            },
            {
                path: 'inquery',
                component: DBQueryComponent,
                canActivate: [AuthGuard],
                data: {
                    admin: true,
                    breadcrumb: 'Query Inquiry',
                    roles: [ 'ROLE_DEV'],
                    permission: ['QUERY_INQUIRY_PERMISSION']
                }
            }
        ]
    },
    {
        path: 'report',
        component: ReportLayoutComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Report & Dashboard',
            roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER', 'ROLE_DEV'],
            permission: ['REPORT_PAGE_PERMISSION'],
        },
        children: [
            {
                path: 'viewReport',
                canActivate: [AuthGuard],
                component: ViewReportComponent,
                data: {
                    breadcrumb: 'View Report',
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['VIEW_REPORT_PERMISSION']
                }
            },
            {
                path: 'viewDashboard',
                canActivate: [AuthGuard],
                component: ViewDashboardComponent,
                data: {
                    breadcrumb: 'View Dashboard',
                    roles: ['ROLE_MASTER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
                    permission: ['VIEW_DASHBOARD_PERMISSION']
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

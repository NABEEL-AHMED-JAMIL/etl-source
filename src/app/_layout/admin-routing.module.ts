import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import {
  ROLE,
  PERMISSION
} from '../_shared';
import {
    SettingDashboardComponent,
    DynamicPayloadQueryComponent,
    DBQueryComponent,
    MGLookupComponent,
    MgTemplateComponent,
    MgRefreshTokenComponent,
    MgRPPComponent,
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
    MgEventBridgeComponent,
    EVConfigComponent,
    MgOrgComponent
} from '../_pages';
import { AuthGuard } from '../_helpers';


const routes: Routes = [
    {
        path: '',
        component: SettingDashboardComponent,
        canActivate: [AuthGuard],
        data: {
            admin: true,
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER, ROLE.ROLE_DEV],
            permission: [PERMISSION.ADMIN_PAGE_PERMISSION]
        }
    },
    // service-setting => source task
    {
        path: 'mgSourceTask',
        component: MgSourceTaskComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg Source Task',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.SOURCE_TASK_PERMISSION]
        }
    },
    // service-setting => source task type
    {
        path: 'mgSourceTaskType',
        component: MgSourceTaskTypeComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg Source Task Type',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.SOURCE_TASKTYPE_PERMISSION]            
        }
    },
    {
        path: 'mgDashboard',
        component: MgDashboardComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg Dashboard',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.MANAGE_DASHBOARD_PERMISSION]
        }
    },
    {
        path: 'mgReport',
        component: MgReportComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg Report',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.MANAGE_REPORT_PERMISSION]
        }
    },
    {
        path: 'mgOLAP',
        component: MgOLAPComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg OLAP',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.MANAGE_OLAP_PERMISSION]
        }
    },
    // form-setting => form
    {
        path: 'mgForm',
        component: MGFormComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg Form',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.FORM_PERMISSION]
        }
    },
    // form-setting => section
    {
        path: 'mgSection',
        component: MGSectionComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg Section',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.SECTION_PERMISSION]
        }
    },
    // form-setting => control
    {
        path: 'mgControl',
        component: MgControlComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg Control',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.CONTROL_PERMISSION]
        }
    },
    {
        path: 'evConfig',
        component: EVConfigComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Enable & Visible',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.ENABLE_AND_VISIBLE_CONTROL_PERMISSION]

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
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.DYNAMIC_PAYLOAD_PERMISSION]
        }
    },
    // form-setting => play-ground
    {
        path: 'mgPlayGround',
        component: MgPlayGroundComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg PlayGround',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.PLAY_GROUND_PERMISSION]
        }
    },
    // profile-setting => mg-users
    {
        path: 'mgUsers',
        component: MgUserComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg User',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_DEV],
            permission: [PERMISSION.USER_PERMISSION]
        }
    },
    {
        path: 'mgOrganization',
        component: MgOrgComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg Organization',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_DEV, ROLE.ROLE_DB],
            permission: [PERMISSION.ORGANIZATION_PERMISSION]
        }
    },
    // profile-setting => mg-rpp
    {
        path: 'mgRPP',
        component: MgRPPComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Role & Profile',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_DEV, ROLE.ROLE_DB],
            permission: [PERMISSION.RPP_PERMISSION]
        }
    },
    // profile-setting => mg-refresh token
    {
        path: 'mgRefreshToken',
        component: MgRefreshTokenComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Refresh Token',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_DEV, ROLE.ROLE_DB],
            permission: [PERMISSION.REFRESH_TOKEN_PERMISSION]
        }
    },
    // service-setting => credentail
    {
        path: 'mgCredentail',
        component: CredentialComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg Credentail',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.SOURCE_CREDENTAIL_PERMISSION]
        }
    },
    {
        path: 'mgEventBridge',
        component: MgEventBridgeComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg Event Bridge',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.EVENT_BRIDGE_PERMISSION]
        }
    },
    {
        path: 'mgEvariable',
        component: MgEVariableComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg E-Variable',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_DEV, ROLE.ROLE_DB],
            permission: [PERMISSION.EVARIABL_PERMISSION]
        }
    },
    // app-setting -> lookup
    {
        path: 'mgLookup',
        component: MGLookupComponent,
        canActivate: [AuthGuard],
        data: {
            parent: true,
            breadcrumb: 'My Lookup',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.LOOKUP_PERMISSION]
        },
    },
    // app-setting -> sub-lookup
    {
        path: 'mgLookup/mgSubLookup',
        component: MGLookupComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Sub Lookup',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.LOOKUP_PERMISSION]
        },
    },
    // app-setting -> template
    {
        path: 'mgTemplate',
        component: MgTemplateComponent,
        canActivate: [AuthGuard],
        data: {
            parent: false,
            breadcrumb: 'Mg Template',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_DEV, ROLE.ROLE_DB],
            permission: [PERMISSION.TEMPLATE_PERMISSION]
        }
    },
    {
        path: 'inquery',
        component: DBQueryComponent,
        canActivate: [AuthGuard],
        data: {
            admin: true,
            breadcrumb: 'Query Inquiry',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_DEV, ROLE.ROLE_DB],
            permission: [PERMISSION.QUERY_INQUIRY_PERMISSION]
        }
    }
];


/**
 * @author Nabeel Ahmed
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}

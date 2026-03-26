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
    ViewReportComponent,
    ViewDashboardComponent
} from '../_pages';
import { AuthGuard } from '../_helpers';


const routes: Routes = [
    {
        path: 'viewReport',
        canActivate: [AuthGuard],
        component: ViewReportComponent,
        data: {
            breadcrumb: 'View Report',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.VIEW_REPORT_PERMISSION]
        }
    },
    {
        path: 'viewDashboard',
        canActivate: [AuthGuard],
        component: ViewDashboardComponent,
        data: {
            breadcrumb: 'View Dashboard',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.VIEW_DASHBOARD_PERMISSION]
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
export class ReportRoutingModule {
}

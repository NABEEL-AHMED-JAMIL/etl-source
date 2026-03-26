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
    ETLSourceComponent,
    UpdateProfileComponent,
} from '../_pages';
import { AuthGuard } from '../_helpers';


const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ETLSourceComponent,
        data: {
            breadcrumb: 'Dashboard',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.MAIN_PAGE_PERMISSION]
        }
    },
    {
        path: 'user/myProfile',
        canActivate: [AuthGuard],
        component: UpdateProfileComponent,
        data: {
            breadcrumb: 'Profile',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.UPDATE_PROFILE_PERMISSION]
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
export class MainRoutingModule {
}

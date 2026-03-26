import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    ROLE,
    PERMISSION
} from './_shared';
import {
    AuthGuard
} from './_helpers';
import {
    MainLayoutComponent,
    AdminLayoutComponent,
    ReportLayoutComponent
} from './_layout';
import {
    PageNotFoundComponent
} from './_pages';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('../app/_pages/auth/index').then((m) => m.AuthModule)
    },
    {
        path: 'main',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Dashboard',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER],
            permission: [PERMISSION.MAIN_PAGE_PERMISSION]
        },
        loadChildren: () => import('../app/_layout/index').then((m) => m.LayoutModule)
    },
    {
        path: 'setting',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Setting',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER, ROLE.ROLE_DEV],
            permission: [PERMISSION.ADMIN_PAGE_PERMISSION],
        },
        loadChildren: () => import('../app/_layout/index').then((m) => m.LayoutModule)
    },
    {
        path: 'report',
        component: ReportLayoutComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Report & Dashboard',
            roles: [ROLE.ROLE_MASTER_ADMIN, ROLE.ROLE_ADMIN, ROLE.ROLE_USER, ROLE.ROLE_DEV],
            permission: [PERMISSION.REPORT_PAGE_PERMISSION],
        },
        loadChildren: () => import('../app/_layout/index').then((m) => m.LayoutModule)
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

/**
 * @author Nabeel Ahmed
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

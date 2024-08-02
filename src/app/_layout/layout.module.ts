import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from '../_helpers/ng-zorro-antd.module';
import { IconsProviderModule } from '../icons-provider.module';
// compoenet
import {
    BreadcrumbComponent,
    AdminLayoutComponent,
    MainLayoutComponent,
    ReportLayoutComponent,
    ActionHeaderListComponent,
    UserActionComponent,
    NotifactionActionComponent
} from './index';

export const APP_COMPONENT = [
    BreadcrumbComponent,
    AdminLayoutComponent,
    ReportLayoutComponent,
    MainLayoutComponent,
    ActionHeaderListComponent,
    UserActionComponent,
    NotifactionActionComponent
];

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        NgZorroAntdModule,
        IconsProviderModule
    ],
    declarations: [
        ...APP_COMPONENT
    ],
})
export class LayoutModule { }

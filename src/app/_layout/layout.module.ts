import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from '../_helpers/ng-zorro-antd.module';
import { IconsProviderModule } from '../icons-provider.module';
// compoenet
import {
    Header2Component,
    BreadcrumbComponent,
    AdminLayoutComponent,
    MainLayoutComponent,
    UserActionComponent,
    NotifactionActionComponent,
    ReportLayoutComponent
} from './index';

export const APP_COMPONENT = [
    Header2Component,
    BreadcrumbComponent,
    AdminLayoutComponent,
    ReportLayoutComponent,
    MainLayoutComponent,
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

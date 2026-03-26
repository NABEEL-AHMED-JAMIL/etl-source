import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
// module
import { CommonModule } from '@angular/common';
import {
    SearchFilterPipe,
    NgZorroAntdModule
} from '../_helpers';
// routing module
import {
    MainRoutingModule,
    AdminRoutingModule,
    ReportRoutingModule,
} from '../_layout';
// compoenet
import {
    BreadcrumbComponent,
    AdminLayoutComponent,
    MainLayoutComponent,
    ReportLayoutComponent,
    ActionHeaderListComponent,
    UserActionComponent,
    MoreActionComponent,
    NotifactionActionComponent
} from '../_layout';
import {
    DynamicPayloadQueryComponent,
    DBQueryComponent,
    QueryInquiryComponent,
    CUQueryInquiryComponent,
    BatchComponent,
    GenTableComponent,
    MGLookupComponent,
    CULookupComponent,
    MgTemplateComponent,
    CUTemplateComponent,
    MgRefreshTokenComponent,
    CURoleComponent,
    MgRPPComponent,
    PPCroseTableComponent,
    CUProfileComponent,
    CUPermissionComponent,
    UpdateProfileComponent,
    CUEvariableComponent,
    MgEVariableComponent,
    CUUserComponent,
    CUOrgComponent,
    MgUserComponent,
    MgOrgComponent,
    RUCroseTableComponent,
    PUCroseTableComponent,
    EVUCroseTableComponent,
    EnvVariableValueComponent,
    CredentialComponent,
    CuCredentialComponent,
    CUFormComponent,
    CUSectionComponent,
    CUControlComponent,
    MGFormComponent,
    MGSectionComponent,
    MgControlComponent,
    MgPlayGroundComponent,
    SettingDashboardComponent,
    ViewDashboardComponent,
    ETLSourceComponent,
    SttcLinkSttsComponent,
    SttfLinkSttComponent,
    SttfLinkSttsComponent,
    SttsLinkSttcComponent,
    SttsLinkSttfComponent,
    MgSourceTaskComponent,
    CuSourceTaskComponent,
    MgSourceTaskTypeComponent,
    CuSourceTTypeComponent,
    SttLinkFormComponent,
    CUDashboardComponent,
    CUReportComponent,
    MgDashboardComponent,
    MgReportComponent,
    CUOLAPComponent,
    MgOLAPComponent,
    ViewReportComponent,
    CUEventBridgeComponent,
    MgEventBridgeComponent,
    EBUCroseTableComponent,
    EVConfigComponent,
    SCVisibilityComponent,
    SCEnableabilityComponent,
    UserInfoComponent,
    OrgFilterComponent,
    DynamicInputComponent,
    DynamicTextAreaComponent,
    DynamicRadioComponent,
    DynamicSelectComponent,
    DynamicDatePickerComponent
} from '../_pages';
// components starting with 'CU'
const CUComponents = [
    CUQueryInquiryComponent,
    CUProfileComponent,
    CURoleComponent,
    CUPermissionComponent,
    CUEvariableComponent,
    CUUserComponent,
    CUOrgComponent,
    CUSectionComponent,
    CUFormComponent,
    CUControlComponent,
    CuCredentialComponent,
    CULookupComponent,
    CUDashboardComponent,
    CUReportComponent,
    CUOLAPComponent,
    CUEventBridgeComponent,
    CuSourceTaskComponent,
    CuSourceTTypeComponent,
    CUTemplateComponent,
];
// other components
const OtherComponents = [
    ETLSourceComponent,
    SettingDashboardComponent,
    ViewDashboardComponent,
    BatchComponent,
    EnvVariableValueComponent,
    UserInfoComponent,
    OrgFilterComponent,
    GenTableComponent,
    DynamicPayloadQueryComponent,
    DBQueryComponent,
    MGLookupComponent,
    MgTemplateComponent,
    MgRefreshTokenComponent,
    MgRPPComponent,
    PPCroseTableComponent,
    RUCroseTableComponent,
    PUCroseTableComponent,
    EVUCroseTableComponent,
    UpdateProfileComponent,
    MgEVariableComponent,
    MgUserComponent,
    MgOrgComponent,
    CredentialComponent,
    MGFormComponent,
    MGSectionComponent,
    MgControlComponent,
    MgPlayGroundComponent,
    SttcLinkSttsComponent,
    SttfLinkSttComponent,
    SttfLinkSttsComponent,
    SttsLinkSttcComponent,
    SttsLinkSttfComponent,
    MgSourceTaskComponent,
    MgDashboardComponent,
    MgReportComponent,
    MgOLAPComponent,
    ViewReportComponent,
    MgEventBridgeComponent,
    EBUCroseTableComponent,
    EVConfigComponent,
    SCEnableabilityComponent,
    SCVisibilityComponent,
    QueryInquiryComponent,
    SttLinkFormComponent,
    MgSourceTaskTypeComponent
];
// dynamic fileds
const DynamicComponents = [
    DynamicInputComponent,
    DynamicTextAreaComponent,
    DynamicRadioComponent,
    DynamicSelectComponent,
    DynamicDatePickerComponent
];
// Layout components
export const APP_COMPONENT = [
    BreadcrumbComponent,
    AdminLayoutComponent,
    ReportLayoutComponent,
    MainLayoutComponent,
    ActionHeaderListComponent,
    UserActionComponent,
    MoreActionComponent,
    NotifactionActionComponent
];

/**
 * @author Nabeel Ahmed
 */
@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        MainRoutingModule,
        AdminRoutingModule,
        ReportRoutingModule
    ],
    declarations: [
        ...APP_COMPONENT,
        ...CUComponents,
        ...OtherComponents,
        ...DynamicComponents
    ],
    exports: [
        SearchFilterPipe
    ]

})
export class LayoutModule { }

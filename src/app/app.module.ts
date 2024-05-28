import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { DatePipe } from '@angular/common';
// module
import { IconsProviderModule } from './icons-provider.module';
import { LayoutModule } from './_layout/layout.module';
import { SpinnerComponent } from './_layout/index';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';
import {
    HttpClientModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
    NgZorroAntdModule,
    ErrorInterceptor,
    JwtInterceptor,
    SearchFilterPipe,
    SearchFilterPipeV2
} from './_helpers';
// compoenet
import {
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    ResetPassComponent,
    PageNotFoundComponent,
    DynamicPayloadQueryComponent,
    DBQueryComponent,
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
    MgUserComponent,
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
    CUWebHookComponent,
    MgWebHookComponent,
    HKUCroseTableComponent
} from './_pages';

// dynamic fileds
import {
    DynamicInputComponent,
    DynamicTextAreaComponent,
    DynamicRadioComponent,
    DynamicSelectComponent,
    DynamicDatePickerComponent
} from './_dynamic-fields';

registerLocaleData(en);

export const APP_COMPONENT = [
    ETLSourceComponent,
    SettingDashboardComponent,
    BatchComponent,
    EnvVariableValueComponent,
    GenTableComponent,
    SearchFilterPipe,
    SearchFilterPipeV2,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    ResetPassComponent,
    PageNotFoundComponent,
    DynamicPayloadQueryComponent,
    DBQueryComponent,
    MGLookupComponent,
    CULookupComponent,
    MgTemplateComponent,
    CUTemplateComponent,
    MgRefreshTokenComponent,
    CURoleComponent,
    CUProfileComponent,
    CUPermissionComponent,
    MgRPPComponent,
    PPCroseTableComponent,
    RUCroseTableComponent,
    PUCroseTableComponent,
    EVUCroseTableComponent,
    UpdateProfileComponent,
    CUEvariableComponent,
    MgEVariableComponent,
    CUUserComponent,
    MgUserComponent,
    CredentialComponent,
    CuCredentialComponent,
    CUFormComponent,
    CUSectionComponent,
    CUControlComponent,
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
    CUWebHookComponent,
    MgWebHookComponent,
    HKUCroseTableComponent,
    // dynamic fileds
    DynamicInputComponent,
    DynamicTextAreaComponent,
    DynamicRadioComponent,
    DynamicSelectComponent,
    DynamicDatePickerComponent
];


@NgModule({
    declarations: [
        AppComponent,
        ...APP_COMPONENT,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        LayoutModule,
        NgZorroAntdModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })
    ],
    providers: [
        DatePipe,
        {
            provide: NZ_I18N,
            useValue: en_US
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

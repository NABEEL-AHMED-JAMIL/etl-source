import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
    HttpClientModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
    NgZorroAntdModule,
    ErrorInterceptor,
    JwtInterceptor,
    SearchFilterPipe,
} from './_helpers';
// compoenet
import {
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    ResetPassComponent,
    PageNotFoundComponent,
    XMLQueryComponent,
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
    MgSourceTaskTypeComponent,
    CuSourceTTaskComponent,
    SttLinkFormComponent,
    CUDashboardComponent,
    CUReportComponent,
    MgDashboardComponent,
    MgReportComponent 
} from './_pages';

registerLocaleData(en);

export const APP_COMPONENT = [
    ETLSourceComponent,
    SettingDashboardComponent,
    BatchComponent,
    EnvVariableValueComponent,
    GenTableComponent,
    SearchFilterPipe,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    ResetPassComponent,
    PageNotFoundComponent,
    XMLQueryComponent,
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
    MgSourceTaskTypeComponent,
    CuSourceTTaskComponent,
    SttLinkFormComponent,
    CUDashboardComponent,
    CUReportComponent,
    MgDashboardComponent,
    MgReportComponent 
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    SearchFilterPipe
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
    CUGroupComponent,
    MgGroupComponent,
    CUUserComponent,
    MgUserComponent,
    RUCroseTableComponent,
    PUCroseTableComponent,
    EVUCroseTableComponent
 } from './_pages';

registerLocaleData(en);

export const APP_COMPONENT = [
    BatchComponent,
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
    CUGroupComponent,
    MgGroupComponent,
    CUUserComponent,
    MgUserComponent
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

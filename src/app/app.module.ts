import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    registerLocaleData,
    CommonModule
} from '@angular/common';
// remove this once you add into other module
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import {
    HttpClientModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { DatePipe } from '@angular/common';
import {
    ErrorInterceptor,
    JwtInterceptor,
    AppDashboardThemeService,
    SearchFilterPipe
} from './_helpers';
import {
    SpinnerComponent
} from './_layout';
import {
    PageNotFoundComponent
} from './_pages';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


registerLocaleData(en);

// load tham on APP_INITIALIZER
export function loadThemeFactory(appDashboardThemeService: AppDashboardThemeService) {
    return () => appDashboardThemeService.loadTheme();
}

// Other components
const OtherComponents = [
    SearchFilterPipe,
    SpinnerComponent,
    PageNotFoundComponent
];

/**
 * @author Nabeel Ahmed
 */
@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        ...OtherComponents
    ],
    providers: [
        DatePipe,
        {
            provide: NZ_I18N,
            useValue: en_US
        },
        {
            provide: APP_INITIALIZER,
            useFactory: loadThemeFactory,
            deps: [AppDashboardThemeService],
            multi: true
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
    exports: [
        SearchFilterPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
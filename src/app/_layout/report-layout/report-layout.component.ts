import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
    ApiCode,
    AuthenticationService,
    DashboardService,
    ReportSettingService,
} from '../../_shared';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import { first } from 'rxjs';
import { RootLayout } from '../root-layout';


@Component({
    selector: 'app-report-layout',
    templateUrl: './report-layout.component.html',
    styleUrls: ['./report-layout.component.css']
})
export class ReportLayoutComponent extends RootLayout implements OnInit {

    public isCollapsed = false;
    public displayMainContent = false;
    public title: any = 'ETL Source 2023';
    public reportList: any[];
    public dashboardList: any[];

    constructor(
        router: Router,
        location: Location,
        authenticationService: AuthenticationService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private reportSettingService: ReportSettingService,
        private dashboardService: DashboardService) {
        super(router, location, authenticationService);
    }

    ngOnInit(): void {
        this.fetchAllReportByGroup({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
        this.fetchAllDashboardSettingByGroup({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllReportByGroup(payload: any): any {
        this.spinnerService.show();
        this.reportSettingService.fetchAllReportByGroup(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.reportList = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // fetch all lookup
    public fetchAllDashboardSettingByGroup(payload: any): any {
        this.spinnerService.show();
        this.dashboardService.fetchAllDashboardSettingByGroup(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.dashboardList = response.data;
                console.log(this.dashboardList);
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public getReportKeys(): any {
        return Object.keys(this.reportList);
    }

    public getReportValue(key: any): any {
        return this.reportList[key];
    }

    public getDashboardKeys(): any {
        return Object.keys(this.dashboardList);
    }

    public getDashboardValue(key: any): any {
        return this.dashboardList[key];
    }

}

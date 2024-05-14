import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
    ApiCode,
    AuthenticationService,
    AuthResponse,
    DashboardService,
    ReportSettingService,
} from '../../_shared';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import { first } from 'rxjs';


@Component({
    selector: 'app-report-layout',
    templateUrl: './report-layout.component.html',
    styleUrls: ['./report-layout.component.css']
})
export class ReportLayoutComponent implements OnInit {

    public isCollapsed = false;
    public displayMainContent = false;
    public title: any = 'ETL Source 2023';
    public reportList: any[];
    public dashboardList: any[];

    public userPermission: any;
    public sessionUser: AuthResponse;

    constructor(
        private router: Router,
        private location: Location,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private reportSettingService: ReportSettingService,
        private dashboardService: DashboardService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
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

    public back(): any {
        this.location.back();
    }

    public home(): any {
        this.router.navigate(['/dashboard']);
    }

}

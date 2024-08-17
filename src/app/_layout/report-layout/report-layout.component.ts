import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
    ApiCode,
    AuthenticationService,
    AuthResponse,
    DashboardService,
    ReportSettingService
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

    public title: any = 'ETL Source R&D 2023';
    public sessionUser: AuthResponse;
    public userPermission: any;

    public reportList: any[] = [];
    public dashboardList: any[] = [];

    constructor(
        private router: Router,
        private location: Location,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private dashboardService: DashboardService,
        private reportSettingService: ReportSettingService,
        private authenticationService: AuthenticationService) {
        this.authenticationService?.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
                if (this.sessionUser) {
                    this.userPermission = currentUser.profile.permission;
                }
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
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public hasPermissionAccess(userProfile: any): boolean {
        return this.userPermission.some((permission: any) => userProfile.includes(permission));
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

    public home(): any {
        this.router.navigate(['/dashboard']);
    }

    public back(): any {
        this.location.back();
    }

}
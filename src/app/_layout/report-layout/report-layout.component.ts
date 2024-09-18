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
    CommomService,
    SpinnerService
} from 'src/app/_helpers';
import { first } from 'rxjs';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-report-layout',
    templateUrl: './report-layout.component.html',
    styleUrls: ['./report-layout.component.css']
})
export class ReportLayoutComponent implements OnInit {

    public isCollapsed = false;
    public title: any = 'ETL Source R&D 2023';
    
    public reportList: any[] = [];
    public dashboardList: any[] = [];
    public sessionUser: AuthResponse;

    constructor(
        private router: Router,
        private location: Location,
        public commomService: CommomService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private dashboardService: DashboardService,
        private reportSettingService: ReportSettingService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService?.currentUserValue;
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
        this.reportSettingService.fetchAllReportByGroup(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.reportList = response.data;
                }
            ));
    }

    // fetch all lookup
    public fetchAllDashboardSettingByGroup(payload: any): any {
        this.spinnerService.show();
        this.dashboardService.fetchAllDashboardSettingByGroup(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.dashboardList = response.data;
                }
            ));
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

    private handleApiResponse(response: any, successCallback: Function): void {
        this.spinnerService.hide();
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}
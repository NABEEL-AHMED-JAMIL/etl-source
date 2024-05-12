import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import { ApiCode,
    AuthResponse,
    AuthenticationService,
    SettingService
} from 'src/app/_shared';


@Component({
    selector: 'app-setting-dashboard',
    templateUrl: './setting-dashboard.component.html',
    styleUrls: ['./setting-dashboard.component.css']
})
export class SettingDashboardComponent implements OnInit {

    public currentUser: AuthResponse;

    public APP_SETTING_STATISTICS: EChartsOption;
    public PROFILE_SETTING_STATISTICS: EChartsOption;
    public FORM_SETTING_STATISTICS: EChartsOption;
    public REPORT_SETTING_STATISTICS: EChartsOption;
    public DASHBOARD_SETTING_STATISTICS: EChartsOption;
    public SERVICE_SETTING_STATISTICS: EChartsOption;

    constructor(
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private settingService: SettingService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
        .subscribe(currentUser => {
            this.currentUser = currentUser;
        });
    }

    ngOnInit(): void {
        this.fetchSettingDashboard({
            username:  this.currentUser.username
        });
    }

    // fetch all lookup
    public fetchSettingDashboard(payload: any): any {
        this.spinnerService.show();
        this.settingService.fetchSettingDashboard(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.APP_SETTING_STATISTICS = this.fillChartByPayloadId(
                    'App Setting', response.data['APP_SETTING_STATISTICS']['data']);
                this.PROFILE_SETTING_STATISTICS = this.fillChartByPayloadId(
                    'Profile Setting', response.data['PROFILE_SETTING_STATISTICS']['data']);
                this.FORM_SETTING_STATISTICS = this.fillChartByPayloadId(
                    'Form Setting', response.data['FORM_SETTING_STATISTICS']['data']);
                this.REPORT_SETTING_STATISTICS = this.fillChartByPayloadId(
                    'Report Setting', response.data['REPORT_SETTING_STATISTICS']['data']);
                this.DASHBOARD_SETTING_STATISTICS = this.fillChartByPayloadId(
                    'Dashboard Setting', response.data['DASHBOARD_SETTING_STATISTICS']['data']);
                this.SERVICE_SETTING_STATISTICS = this.fillChartByPayloadId(
                    'Form Setting', response.data['SERVICE_SETTING_STATISTICS']['data']);
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public fillChartByPayloadId(name: any, data: any): any {
        return {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              show: false 
            },
            series: [
              {
                name: name,
                type: 'pie',
                radius: ['40%', '60%'],
                center: ['50%', '45%'],
                data: data,
                label: {
                    formatter: '{b}: ({c})'
                }
              }
            ]
        };
    }

}
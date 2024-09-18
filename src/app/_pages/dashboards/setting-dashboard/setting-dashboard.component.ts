import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { first } from 'rxjs';
import {
    AlertService,
    AppDashboardThemeService
} from 'src/app/_helpers';
import {
    ApiCode,
    AuthResponse,
    AuthenticationService,
    SettingService,
} from 'src/app/_shared';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-setting-dashboard',
    templateUrl: './setting-dashboard.component.html',
    styleUrls: ['./setting-dashboard.component.css']
})
export class SettingDashboardComponent implements OnInit {

    public sessionUser: AuthResponse;
    public SERVICE_SETTING_STATISTICS: EChartsOption;
    public DASHBOARD_AND_REPORT_SETTING_STATISTICS: EChartsOption;
    public FORM_SETTING_STATISTICS: EChartsOption;
    public PROFILE_SETTING_STATISTICS: EChartsOption;
    public APP_SETTING_STATISTICS: EChartsOption;
    public SESSION_COUNT_STATISTICS: EChartsOption;

    constructor(
        private alertService: AlertService,
        private settingService: SettingService,
        private appDashboardThemeService: AppDashboardThemeService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService?.currentUserValue;
    }

    ngOnInit(): void {
        this.fetchStatisticsDashboard({
            username: this.sessionUser.username
        });
    }

    // fetch all lookup
    public fetchStatisticsDashboard(payload: any): any {
        this.settingService.fetchStatisticsDashboard(payload).pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.initCharts(response.data);  // Initialize charts after data is set
                }
            ));
    }

    public initCharts(data: any): void {
        // SERVICE_SETTING_STATISTICS
        this.SERVICE_SETTING_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Service Setting', data['SERVICE_SETTING_STATISTICS']['data']);
        this.appDashboardThemeService.initChart('SERVICE_SETTING_STATISTICS', this.SERVICE_SETTING_STATISTICS);
        // DASHBOARD_AND_REPORT_SETTING_STATISTICS
        this.DASHBOARD_AND_REPORT_SETTING_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Service Setting', data['DASHBOARD_AND_REPORT_SETTING_STATISTICS']['data']);
        this.appDashboardThemeService.initChart('DASHBOARD_AND_REPORT_SETTING_STATISTICS', this.DASHBOARD_AND_REPORT_SETTING_STATISTICS);
        // APP_SETTING_STATISTICS
        this.APP_SETTING_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('App Setting',data['APP_SETTING_STATISTICS']['data']);
        this.appDashboardThemeService.initChart('APP_SETTING_STATISTICS', this.APP_SETTING_STATISTICS);
        // FORM_SETTING_STATISTICS
        this.FORM_SETTING_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Form Setting', data['FORM_SETTING_STATISTICS']['data']);
        this.appDashboardThemeService.initChart('FORM_SETTING_STATISTICS', this.FORM_SETTING_STATISTICS);
        // PROFILE_SETTING_STATISTICS
        this.PROFILE_SETTING_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Profile Setting', data['PROFILE_SETTING_STATISTICS']['data']);
        this.appDashboardThemeService.initChart('PROFILE_SETTING_STATISTICS', this.PROFILE_SETTING_STATISTICS);
        // SESSION_COUNT_STATISTICS
        this.SESSION_COUNT_STATISTICS = this.appDashboardThemeService.fillAxisChartPayload(data['SESSION_COUNT_STATISTICS']['data']);
        this.appDashboardThemeService.initChart('SESSION_COUNT_STATISTICS', this.SESSION_COUNT_STATISTICS);
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}
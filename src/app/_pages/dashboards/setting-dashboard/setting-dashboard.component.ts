import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import {
    ApiCode,
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

    public SERVICE_SETTING_STATISTICS: EChartsOption;
    public DASHBOARD_AND_REPORT_SETTING_STATISTICS: EChartsOption;
    public FORM_SETTING_STATISTICS: EChartsOption;
    public PROFILE_SETTING_STATISTICS: EChartsOption;
    public APP_SETTING_STATISTICS: EChartsOption;
    public SESSION_COUNT_STATISTICS: EChartsOption;

    // daily session detail
    public fromdate: any;
    public todate: any;

    constructor(
        private http: HttpClient,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private settingService: SettingService,
        private authenticationService: AuthenticationService) {
        this.loadTheme();
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });

    }

    ngOnInit(): void {
        this.fetchSettingDashboard({
            username: this.currentUser.username
        });
    }

    public loadTheme(): void {
        this.http.get('assets/shine-theme.json')
            .subscribe((theme: any) => {
                echarts.registerTheme('shine', theme);
            });
    }

    public initCharts(): void {
        this.initChart('SERVICE_SETTING_STATISTICS', this.SERVICE_SETTING_STATISTICS);
        this.initChart('DASHBOARD_AND_REPORT_SETTING_STATISTICS', this.DASHBOARD_AND_REPORT_SETTING_STATISTICS);
        this.initChart('FORM_SETTING_STATISTICS', this.FORM_SETTING_STATISTICS);
        this.initChart('PROFILE_SETTING_STATISTICS', this.PROFILE_SETTING_STATISTICS);
        this.initChart('APP_SETTING_STATISTICS', this.APP_SETTING_STATISTICS);
        this.initChart('SESSION_COUNT_STATISTICS', this.SESSION_COUNT_STATISTICS);
    }

    public initChart(elementId: string, chartOptions: EChartsOption): void {
        const chartDom = document.getElementById(elementId);
        if (chartDom) {
            const myChart = echarts.init(chartDom, 'shine');
            myChart.setOption(chartOptions);
        }
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
                this.SERVICE_SETTING_STATISTICS = this.fillChartByPayloadId(
                    'Service Setting', response.data['SERVICE_SETTING_STATISTICS']['data']);
                this.DASHBOARD_AND_REPORT_SETTING_STATISTICS = this.fillChartByPayloadId(
                    'Service Setting', response.data['DASHBOARD_AND_REPORT_SETTING_STATISTICS']['data']);
                this.APP_SETTING_STATISTICS = this.fillChartByPayloadId(
                    'App Setting', response.data['APP_SETTING_STATISTICS']['data']);
                this.FORM_SETTING_STATISTICS = this.fillChartByPayloadId(
                    'Form Setting', response.data['FORM_SETTING_STATISTICS']['data']);
                this.PROFILE_SETTING_STATISTICS = this.fillChartByPayloadId(
                    'Profile Setting', response.data['PROFILE_SETTING_STATISTICS']['data']);
                this.SESSION_COUNT_STATISTICS = this.fillChartBySessionCount(
                    response.data['SESSION_COUNT_STATISTICS']['data']);
                this.initCharts();  // Initialize charts after data is set
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public fillChartByPayloadId(name: any, data: any): EChartsOption {
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
                    center: ['50%', '50%'],
                    data: data,
                    label: {
                        formatter: '{b}: ({c})'
                    }
                }
            ]
        };
    }

    public fillChartBySessionCount(data: any): EChartsOption {
        return {
            title: {
                show: false
            },
            toolbox: {
                show: false
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '7%',
                right: '7%',
                top: '12%',
                bottom: '15%'
            },
            dataZoom: [],
            xAxis: {
                data: data.map((object: any) => object.key),
                silent: false,
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                }
            },
            yAxis: {
                splitArea: {
                    show: false
                }
            },
            series: [
                {
                    type: 'bar',
                    data: data.map((object: any) => object.value),
                    large: true,
                }
            ]
        }
    }

}
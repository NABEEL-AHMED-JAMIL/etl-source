import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
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

    public APP_SETTING_STATISTICS: EChartsOption;
    public PROFILE_SETTING_STATISTICS: EChartsOption;
    public FORM_SETTING_STATISTICS: EChartsOption;
    public REPORT_SETTING_STATISTICS: EChartsOption;
    public DASHBOARD_SETTING_STATISTICS: EChartsOption;
    public SERVICE_SETTING_STATISTICS: EChartsOption;
    public SESSION_COUNT_STATISTICS: EChartsOption;
    // daily session detail
    public fromdate: any;
    public todate: any;

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
            username: this.currentUser.username
        });
    }

    public generateRandomData(count: number): { key: string[], value: string[] } {
        const key: string[] = [];
        const value: string[] = [];
        for (let i = 0; i < count; i++) {
          const randomYear = Math.floor(Math.random() * (2025 - 2010)) + 2010;
          const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
          const randomDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
          const formattedDate = `${randomYear}-${randomMonth}-${randomDay}`;
          key.push(formattedDate);
          value.push((Math.random() * 1000).toFixed(2));
        }
        return {
            key: key,
            value: value
        };
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
                    'Service Setting', response.data['SERVICE_SETTING_STATISTICS']['data']);
                this.SESSION_COUNT_STATISTICS = this.SESSION_COUNT_STATISTICS = 
                    this.fillChartBySessionCount(response.data['SESSION_COUNT_STATISTICS']['data']);
                    
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
            dataZoom: [
                // {
                //     type: 'inside',
                //     // Change size of the inside zoom area
                //     width: 20, // Set the width
                //     height: 20 // Set the height
                // },
                // {
                //     type: 'slider',
                //     height: 10, // Set the height
                //     bottom: 10, // Set the position from the bottom
                // }
            ],
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
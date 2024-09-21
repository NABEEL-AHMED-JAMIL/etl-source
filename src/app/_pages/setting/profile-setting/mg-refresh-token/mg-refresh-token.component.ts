import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import {
    ApiCode,
    IStaticTable,
    ISession,
    IQuery,
    ActionType,
    RefreshTokenService,
    AuthResponse,
    AuthenticationService,
    AppDashboardThemeService
} from '../../../../_shared';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService
} from '../../../../_helpers';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-mg-refresh-token',
    templateUrl: './mg-refresh-token.component.html',
    styleUrls: ['./mg-refresh-token.component.css']
})
export class MgRefreshTokenComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public sessionUser: AuthResponse;
    public setOfCheckedId = new Set<any>();
    public sessionStatistics: ISession;
    // chart
    public DAILY_STATISTICS: EChartsOption;
    public WEEKLY_STATISTICS: EChartsOption;
    public MONTHLY_STATISTICS: EChartsOption;
    public YEARLY_STATISTICS: EChartsOption;
    public refreshTokenTable = this.initStaticTable();

    constructor(
        private alertService: AlertService,
        public commomService: CommomService,
        private appDashboardThemeService: AppDashboardThemeService,
        private refreshTokenService: RefreshTokenService,
        private authenticationService: AuthenticationService) {
        this.endDate = this.commomService.getCurrentDate();
        this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
        this.sessionUser = this.authenticationService?.currentUserValue;
    }

    ngOnInit(): void {
        this.fetchByAllRefreshToken({
            startDate: this.startDate,
            endDate: this.endDate
        });
        this.fetchSessionStatistics();
    }

    private initStaticTable(): IStaticTable {
        return {
            tableUuid: this.commomService.uuid(),
            title: 'Refresh Token',
            bordered: true,
            checkbox: false,
            size: 'small',
            headerButton: [
                {
                    type: 'reload',
                    color: 'red',
                    spin: false,
                    tooltipTitle: 'Refresh',
                    action: ActionType.RE_FRESH
                }
            ],
            dataColumn: [
                {
                    field: 'token',
                    header: 'Token',
                    type: 'data'
                },
                {
                    field: 'expiryDate',
                    header: 'Expiry Date',
                    type: 'date'
                },
                {
                    field: 'ipAddress',
                    header: 'IP Address',
                    type: 'data'
                },
                {
                    field: 'dateCreated',
                    header: 'Created',
                    type: 'date'
                },
                {
                    field: 'createdBy',
                    header: 'Created By',
                    type: 'combine',
                    subfield: ['username']
                },
                {
                    field: 'dateUpdated',
                    header: 'Updated',
                    type: 'date'
                },
                {
                    field: 'updatedBy',
                    header: 'Updated By',
                    type: 'combine',
                    subfield: ['username']
                },
                {
                    field: 'status',
                    header: 'Status',
                    type: 'tag'
                }
            ]
        };
    }

    // fetch session statistics
    public fetchSessionStatistics(): any {
        this.refreshTokenService.fetchSessionStatistics().pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.queryParseForStatisticResult(response.data);
                    this.initCharts();
                })
            );
    }

    // fetch all lookup
    public fetchByAllRefreshToken(payload: any): any {
        this.refreshTokenService.fetchByAllRefreshToken(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.refreshTokenTable.dataSource = response.data;
                })
            );
    }


    public buttonActionReciver(payload: any): void {
        if (ActionType.RE_FRESH === payload.action) {
            this.fetchByAllRefreshToken({
                startDate: this.startDate,
                endDate: this.endDate
            });
        }
    }

    public filterActionReciver(payload: any): void {
        this.startDate = payload.startDate;
        this.endDate = payload.endDate;
        this.fetchByAllRefreshToken({
            startDate: this.startDate,
            endDate: this.endDate
        });
    }

    public queryParseForStatisticResult(queryResponse: IQuery) {
        this.sessionStatistics = {};
        const updateStatistics = (name: string, totalCount: number, 
            activeCount: number, offCount: number) => {
                const statistics = {
                    totalCount,
                    sessionData: [
                        { name: 'Login', value: activeCount },
                        { name: 'Logout', value: offCount }
                    ]
                };
                switch (name) {
                    case 'DAILY':
                        this.sessionStatistics.dailyCount = statistics.totalCount;
                        this.sessionStatistics.daily = statistics.sessionData;
                        break;
                    case 'WEEK':
                        this.sessionStatistics.weeklyCount = statistics.totalCount;
                        this.sessionStatistics.weekly = statistics.sessionData;
                        break;
                    case 'MONTH':
                        this.sessionStatistics.monthlyCount = statistics.totalCount;
                        this.sessionStatistics.monthly = statistics.sessionData;
                        break;
                    case 'YEAR':
                        this.sessionStatistics.yearlyCount = statistics.totalCount;
                        this.sessionStatistics.yearly = statistics.sessionData;
                        break;
                }
        };
        queryResponse.data
            .forEach((data: any) => {
                if (data) {
                    updateStatistics(data.name, data.totalcount, data.activecount, data.offcount);
                }
            });
    }

    public initCharts(): void {
        // daily
        this.DAILY_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Daily Count', this.sessionStatistics.daily);
        this.appDashboardThemeService.initChart('DAILY_STATISTICS', this.DAILY_STATISTICS);
        // weekly
        this.WEEKLY_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Weekly Count', this.sessionStatistics.weekly);
        this.appDashboardThemeService.initChart('WEEKLY_STATISTICS', this.WEEKLY_STATISTICS);
        // monthly
        this.MONTHLY_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Monthly Count', this.sessionStatistics.monthly);
        this.appDashboardThemeService.initChart('MONTHLY_STATISTICS', this.MONTHLY_STATISTICS);
        // yearly
        this.YEARLY_STATISTICS = this.appDashboardThemeService.fillPieChartPayload('Yearly Count', this.sessionStatistics.yearly);
        this.appDashboardThemeService.initChart('YEARLY_STATISTICS', this.YEARLY_STATISTICS);
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}

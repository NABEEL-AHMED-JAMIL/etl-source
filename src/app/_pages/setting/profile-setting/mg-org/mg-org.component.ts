import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs/internal/operators/first';
import {
    AlertService,
    CommomService,
    SpinnerService
} from 'src/app/_helpers';
import { CUOrgComponent } from 'src/app/_pages';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    ORGANIZATIONS,
    AuthenticationService,
    OrganizationService,
    IOrganization,
    DATA,
    IStaticTable,
} from 'src/app/_shared';


/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-mg-org',
    templateUrl: './mg-org.component.html',
    styleUrls: ['./mg-org.component.css']
})
export class MgOrgComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public sessionUser: AuthResponse;
    
    public searchDetails: any;
    public staticTable: IStaticTable = {
        tableId: 'mg-org-id',
        title: 'Mg Organization',
        size: 'small',
        headerButton: [
            {
                type: 'plus-circle',
                color: 'red',
                spin: false,
                tooltipTitle: 'Add',
                action: ActionType.ADD
            },
            {
                type: 'reload',
                color: 'red',
                spin: false,
                tooltipTitle: 'Refresh',
                action: ActionType.RE_FRESH
            }
        ]
    };
    // 
    public organizations: IOrganization[] = ORGANIZATIONS;

    public SERVICE_SETTING_STATISTICS: EChartsOption = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: false
        },
        series: [
            {
                name: 'Nabeel',
                type: 'pie',
                radius: ['40%', '60%'],
                center: ['50%', '50%'],
                data: [
                    {
                        "name": "ACTIVE-EVENT-BRIDGE",
                        "value": 4
                    },
                    {
                        "name": "ACTIVE-LOOKUP",
                        "value": 37
                    },
                    {
                        "name": "ACTIVE-E-VARIABLE",
                        "value": 3
                    },
                    {
                        "name": "ACTIVE-TEMPLATE",
                        "value": 14
                    },
                    {
                        "name": "ACTIVE-CREDENTIAL",
                        "value": 3
                    }
                ],
                label: {
                    formatter: '{b}: ({c})',
                    show: true
                }
            }
        ]
    };
    public SESSION_COUNT_STATISTICS: EChartsOption = {
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
            data: DATA.map((object: any) => object.key),
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
                data: DATA.map((object: any) => object.value),
                large: true,
            }
        ]
    };

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private commomService: CommomService,
        private spinnerService: SpinnerService,
        private organizationService: OrganizationService,
        private authenticationService: AuthenticationService) {
            this.endDate = this.commomService.getCurrentDate();
            this.startDate = this.commomService.getDate364DaysAgo(this.endDate);
            this.authenticationService.currentUser
                .subscribe(currentUser => {
                    this.sessionUser = currentUser;
                });
    }

    ngOnInit(): void {
        this.fetchAllOrgAccount({
            startDate: this.startDate,
            endDate: this.endDate,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public fetchAllOrgAccount(payload: any): any {
        this.spinnerService.show();
        this.organizationService.fetchAllOrgAccount(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public onDateChangeEvent(): void {
    }

    public buttonEvent(action: ActionType): void {
    }
}

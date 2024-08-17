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
} from 'src/app/_shared';


@Component({
    selector: 'app-mg-org',
    templateUrl: './mg-org.component.html',
    styleUrls: ['./mg-org.component.css']
})
export class MgOrgComponent implements OnInit {

    public startDate: any;
    public endDate: any;

    public sessionUser: AuthResponse;
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
        this.fetchAllOrg({
            startDate: this.startDate,
            endDate: this.endDate,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public fetchAllOrg(payload: any): any {
        this.spinnerService.show();
        this.organizationService.fetchAllOrg(payload)
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

    public tableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuOrg(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {

                }
            });
        } else if (ActionType.VIEW === payload.action) {

        } else if (ActionType.ENABLED === payload.action) {

        } else if (ActionType.DISABLED === payload.action) {

        }
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuOrg(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllOrg({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.spinnerService.show();
            this.organizationService.downloadOrg({
                ids: payload.checked,
                sessionUser: {
                    username: this.sessionUser.username
                },
            }).pipe(first())
                .subscribe((response: any) => {
                    this.commomService.downLoadFile(response);
                    this.spinnerService.hide();
                }, (response: any) => {
                    this.spinnerService.hide();
                    this.alertService.showError(response.error.message, ApiCode.ERROR);
                });
        }
    }

    public filterActionReciver(payload: any): void {
        this.startDate = payload.startDate;
        this.endDate = payload.endDate;
        this.fetchAllOrg({
            startDate: this.startDate,
            endDate: this.endDate,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public extraActionReciver(payload: any): void {
        if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteAllOrg(
                        {
                            ids: payload.checked,
                            sessionUser: {
                                username: this.sessionUser.username
                            }
                        });
                }
            });
        }
    }

    public deleteAllOrg(payload: any): void {
        this.spinnerService.show();
        this.organizationService.deleteAllOrg(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllOrg({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public openCuOrg(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'large',
            nzTitle: actionType === ActionType.ADD ? 'Add Org' : 'Edit Org',
            nzFooter: 'Note:- Once org create onwer detail not change [email].',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUOrgComponent,
            nzContentParams: {
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllOrg({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

}

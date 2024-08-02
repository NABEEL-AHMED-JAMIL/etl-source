import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
    SpinnerService
} from 'src/app/_helpers';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    DashboardService,
    IDashboardSetting,
    IStaticTable
} from 'src/app/_shared';
import { Router } from '@angular/router';
import { CUDashboardComponent } from 'src/app/_pages';


@Component({
    selector: 'app-mg-dashboard',
    templateUrl: './mg-dashboard.component.html',
    styleUrls: ['./mg-dashboard.component.css']
})
export class MgDashboardComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public setOfCheckedId = new Set<any>();
    public sessionUser: AuthResponse;
    public dashboardTable: IStaticTable = {
        tableId: 'dashboard_id',
        title: 'Mg Dashboard',
        bordered: true,
        checkbox: true,
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
        ],
        extraHeaderButton: [
            {
                title: 'Delete All',
                type: 'delete',
                action: ActionType.DELETE
            }
        ],
        dataColumn: [
            {
                field: 'name',
                header: 'Name',
                type: 'data'
            },
            {
                field: 'groupType',
                header: 'Group Type',
                type: 'tag'
            },
            {
                field: 'boardType',
                header: 'Board Type',
                type: 'tag',
                showImg: true
            },
            {
                field: 'iframe',
                header: 'Frame',
                type: 'tag'
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
        ],
        actionType: [
            {
                type: 'eye',
                color: 'orange',
                spin: false,
                tooltipTitle: 'View Report',
                action: ActionType.VIEW
            },
            {
                type: 'edit',
                color: 'green',
                spin: false,
                tooltipTitle: 'Edit',
                action: ActionType.EDIT
            },
            {
                type: 'delete',
                color: 'red',
                spin: false,
                tooltipTitle: 'Delete',
                action: ActionType.DELETE
            }
        ]
    };

    constructor(
        private router: Router,
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private commomService: CommomService,
        private spinnerService: SpinnerService,
        private dashboardService: DashboardService,
        private authenticationService: AuthenticationService) {
        this.endDate = this.commomService.getCurrentDate();
        this.startDate = this.commomService.getDate364DaysAgo(this.endDate);
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchAllDashboardSetting({
            startDate: this.startDate,
            endDate: this.endDate,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllDashboardSetting(payload: any): any {
        this.spinnerService.show();
        this.dashboardService.fetchAllDashboardSetting(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.dashboardTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public deleteDashboardSettingById(payload: any): void {
        this.spinnerService.show();
        this.dashboardService.deleteDashboardSettingById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllDashboardSetting({
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

    public tableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuEnVariable(ActionType.EDIT, payload);
        } else if (ActionType.VIEW === payload.action) {
            if (payload.data.groupType) {
                this.router.navigate(['/report/viewDashboard'], { queryParams: { dashboardId: payload.data.id } });
            } else {
                this.alertService.showInfo('Please Link Dashboard Group.', ApiCode.SUCCESS);
            }
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let dashboard: IDashboardSetting = {
                        id: payload.data.id,
                        name: payload.data.name,
                        description: payload.data.description
                    }
                    this.deleteDashboardSettingById({
                        ...dashboard,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        }
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuEnVariable(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllDashboardSetting({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    public filterActionReciver(payload: any): void {
        this.startDate = payload.startDate;
        this.endDate = payload.endDate;
        this.fetchAllDashboardSetting({
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
                    this.deleteAllDashboardSetting(
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

    public openCuEnVariable(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'large',
            nzTitle: actionType === ActionType.ADD ? 'Add Dashboard' : 'Edit Dashboard',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUDashboardComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllDashboardSetting({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

    public deleteAllDashboardSetting(payload: any): void {
        this.spinnerService.show();
        this.dashboardService.deleteAllDashboardSetting(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllDashboardSetting({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
                this.setOfCheckedId = new Set<any>();
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

}

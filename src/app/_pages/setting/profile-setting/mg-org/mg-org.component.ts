import { Component, OnInit } from '@angular/core';
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
    IStaticTable,
    ORGANIZATIONS,
    AuthenticationService,
    OrganizationService,
    IOrganization
} from 'src/app/_shared';


@Component({
    selector: 'app-mg-org',
    templateUrl: './mg-org.component.html',
    styleUrls: ['./mg-org.component.css']
})
export class MgOrgComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public setOfCheckedId = new Set<any>();

    public sessionUser: AuthResponse;
    public orgTable: IStaticTable = {
        tableId: 'org_id',
        title: 'Mg Org',
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
            },
            {
                type: 'download',
                color: 'balck',
                spin: false,
                tooltipTitle: 'Download',
                action: ActionType.DOWNLOAD
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
                type: 'date'
            },
            {
                field: 'address',
                header: 'Address',
                type: 'date'
            },
            {
                field: 'email',
                header: 'Email',
                type: 'date'
            },
            {
                field: 'phone',
                header: 'Phone',
                type: 'date'
            },
            {
                field: 'country',
                header: 'Country',
                type: 'date'
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
                tooltipTitle: 'Delete Org',
                action: ActionType.DELETE
            },
            {
                type: 'eye',
                color: 'orange',
                spin: false,
                tooltipTitle: 'View Org',
                action: ActionType.VIEW
            },
        ],
        moreActionType: [
            {
                title: 'Active Org',
                type: 'check-circle',
                targetFiled: 'status',
                condition: "EQ",
                targetValue: 0,
                action: ActionType.ENABLED
            },
            {
                title: 'In Active Org',
                type: 'close-circle',
                targetFiled: 'status',
                condition: "EQ",
                targetValue: 1,
                action: ActionType.DISABLED
            }
        ]
    };

    public ministries: IOrganization[] = ORGANIZATIONS;

    constructor(private drawerService: NzDrawerService,
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
                this.orgTable.dataSource = response.data;
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

import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import { AlertService, CommomService, SpinnerService } from 'src/app/_helpers';
import { CUUserComponent } from 'src/app/_pages';
import { 
    APPLICATION_STATUS,
    ActionType,
    ApiCode,
    AppUserService,
    AuthResponse,
    AuthenticationService,
    IAppUser,
    IStaticTable,
} from 'src/app/_shared';


@Component({
    selector: 'app-mg-user',
    templateUrl: './mg-user.component.html',
    styleUrls: ['./mg-user.component.css']
})
export class MgUserComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public setOfCheckedId = new Set<any>();
    //
    public sessionUser: AuthResponse;
    public subUserTable: IStaticTable = {
        tableId: 'user_id',
        title: 'Mg User',
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
                type: 'upload',
                color: 'balck',
                spin: false,
                tooltipTitle: 'Upload',
                action: ActionType.UPLOAD
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
                field: 'email',
                header: 'Email',
                type: 'data'
            },
            {
                field: 'username',
                header: 'Username',
                type: 'data'
            },
            {
                field: 'profile',
                header: 'Profile',
                type: 'combine',
                subfield: ['profileName']
            },
            {
                field: 'ipAddress',
                header: 'Ip Address',
                type: 'data'
            },
            {
                field: 'profileImg',
                header: 'Image',
                type: 'img'
            },
            {
                field: 'totalSubUser',
                header: 'SubUser',
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
                subfield: ['id' , 'username']
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
                subfield: ['id' , 'username']
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
                color: 'darkorange',
                spin: false,
                tooltipTitle: 'View Profile',
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
        ],
        moreActionType: [
            {
                title: 'Active User',
                type: 'check-circle',
                targetFiled: 'status',
                condition: "EQ",
                targetValue: 0,
                action: ActionType.ENABLED
            },
            {
                title: 'InActive User',
                type: 'close-circle',
                targetFiled: 'status',
                condition: "EQ",
                targetValue: 1,
                action: ActionType.DISABLED
            },
            {
                title: 'View Sub User',
                type: 'right-circle',
                action: ActionType.MORE
            }
        ]
    };

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private commomService: CommomService,
        private spinnerService: SpinnerService,
        private appUserService: AppUserService,
        private authenticationService: AuthenticationService) {
            this.endDate = this.commomService.getCurrentDate();
            this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
            this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchAllAppUserAccount({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public fetchAllAppUserAccount(payload: any): any {
        this.spinnerService.show();
        this.appUserService.fetchAllAppUserAccount(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.subUserTable.dataSource = response.data;
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuEnVariable(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllAppUserAccount({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    public tableActionReciver(payload: any): void {
        if (ActionType.VIEW === payload.action) {
        } else if (ActionType.EDIT === payload.action) {
            this.openCuEnVariable(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let appUser: IAppUser = {
                        id: payload.data.id,
                        email: payload.data.email,
                        username: payload.data.username
                    }
                    this.closeAppUserAccount({
                        ...appUser,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        } else if (ActionType.MORE === payload.action) {
        } else if (ActionType.ENABLED === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to enabled?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let appUser: IAppUser = {
                        id: payload.data.id,
                        status: APPLICATION_STATUS.ACTIVE
                    }
                    this.enabledDisabledAppUserAccount({
                        ...appUser,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        } else if (ActionType.DISABLED === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to disabled?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let appUser: IAppUser = {
                        id: payload.data.id,
                        status: APPLICATION_STATUS.INACTIVE
                    }
                    this.enabledDisabledAppUserAccount({
                        ...appUser,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        }
    }

    public closeAppUserAccount(payload: any): void {
        this.spinnerService.show();
        this.appUserService.closeAppUserAccount(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllAppUserAccount({
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public enabledDisabledAppUserAccount(payload: any): void {
        this.spinnerService.show();
        this.appUserService.enabledDisabledAppUserAccount(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllAppUserAccount({
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public openCuEnVariable(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'large',
            nzTitle: actionType === ActionType.ADD ? 'Add User' : 'Edit User',
            nzFooter: 'Please conteact with support team in case "Role & Permission" not show, Setting may disabled for your account.',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUUserComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllAppUserAccount({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

}
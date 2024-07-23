import { Component, OnInit } from '@angular/core';
import {
    ApiCode,
    IStaticTable,
    ActionType,
    RPPService,
    AuthResponse,
    APPLICATION_STATUS,
    AuthenticationService,
    IRole,
    IProfile,
    IPermission
} from '../../../../_shared';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
    SpinnerService
} from '../../../../_helpers';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CURoleComponent } from '../mg-cu/cu-role/cu-role.component';
import { CUProfileComponent } from '../mg-cu/cu-profile/cu-profile.component';
import { CUPermissionComponent } from '../mg-cu/cu-permission/cu-permission.component';
import {
    BatchComponent,
    PUCroseTableComponent,
    RUCroseTableComponent
} from 'src/app/_pages';


@Component({
    selector: 'app-mg-rpp',
    templateUrl: './mg-rpp.component.html',
    styleUrls: ['./mg-rpp.component.css']
})
export class MgRPPComponent implements OnInit {

    public title = 'Roler & Profile';
    public setOfRoleCheckedId = new Set<any>();
    public setOfProfileCheckedId = new Set<any>();
    public setOfPermissionCheckedId = new Set<any>();

    public sessionUser: AuthResponse;
    public roleTable: IStaticTable = {
        tableId: 'role_id',
        title: 'Mg Role',
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
                field: 'name',
                header: 'Name',
                type: 'data'
            },
            {
                field: 'description',
                header: 'Description',
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
        ],
        actionType: [
            {
                type: 'edit',
                color: 'green',
                spin: false,
                tooltipTitle: 'Edit',
                action: ActionType.EDIT
            },
            // {
            //     type: 'link',
            //     color: 'orange',
            //     spin: false,
            //     tooltipTitle: 'Link With User',
            //     action: ActionType.LINK
            // },
            {
                type: 'delete',
                color: 'red',
                spin: false,
                tooltipTitle: 'Delete',
                action: ActionType.DELETE
            }
        ]
    };

    // profile
    public profileTable: IStaticTable = {
        tableId: 'profile_id',
        title: 'Mg Profile',
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
                field: 'profileName',
                header: 'Name',
                type: 'data'
            },
            {
                field: 'description',
                header: 'Description',
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
        ],
        actionType: [
            {
                type: 'edit',
                color: 'green',
                spin: false,
                tooltipTitle: 'Edit',
                action: ActionType.EDIT
            },
            // {
            //     type: 'link',
            //     color: 'orange',
            //     spin: false,
            //     tooltipTitle: 'Link With User',
            //     action: ActionType.LINK
            // },
            {
                type: 'delete',
                color: 'red',
                spin: false,
                tooltipTitle: 'Delete',
                action: ActionType.DELETE
            }
        ]
    };

    // permission
    public permissionTable: IStaticTable = {
        tableId: 'permission_id',
        title: 'Mg Permission',
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
                field: 'permissionName',
                header: 'Name',
                type: 'data'
            },
            {
                field: 'description',
                header: 'Description',
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
                tooltipTitle: 'Delete',
                action: ActionType.DELETE
            }
        ]
    };

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private rppService: RPPService,
        private commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchAllRole({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
        this.fetchAllProfile({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
        this.fetchAllPermission({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // role
    public fetchAllRole(payload: any): any {
        this.spinnerService.show();
        this.rppService.fetchAllRole(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.roleTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public buttonRoleActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuRole(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllRole({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.downloadRole({
                sessionUser: {
                    username: this.sessionUser.username
                },
            });
        } else if (ActionType.UPLOAD === payload.action) {
            payload.action = 'Role';
            const drawerRef = this.drawerService.create({
                nzTitle: 'Batch Operation',
                nzSize: 'default',
                nzMaskClosable: false,
                nzFooter: 'Note :- Add Xlsx File For Process, Once File Upload Successfully Click the Refresh Button',
                nzContent: BatchComponent,
                nzContentParams: {
                    batchDetail: payload
                }
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchAllRole({
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
            });
        }
    }

    public tableRoleActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuRole(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let role: IRole = {
                        id: payload.data.id,
                        name: payload.data.name,
                        description: payload.data.description,
                        status: APPLICATION_STATUS.DELETE
                    }
                    this.deleteRoleById({
                        ...role,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        } else if (ActionType.LINK === payload.action) {
            this.drawerService.create({
                nzTitle: '[' + payload.data.id + '] ' + payload.data.name,
                nzWidth: 800,
                nzFooter: null, // Optional footer
                nzContent: RUCroseTableComponent,
                nzContentParams: {
                    role: payload.data
                }
            });
        }
    }

    public extraRoleActionReciver(payload: any): void {
        if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.spinnerService.show();
                    this.rppService.deleteAllRole({
                        ids: payload.checked,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    })
                        .pipe(first())
                        .subscribe((response: any) => {
                            this.spinnerService.hide();
                            if (response.status === ApiCode.ERROR) {
                                this.alertService.showError(response.message, ApiCode.ERROR);
                                return;
                            }
                            this.fetchAllRole({
                                sessionUser: {
                                    username: this.sessionUser.username
                                }
                            });
                            this.setOfRoleCheckedId = new Set<any>();
                            this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                        }, (response: any) => {
                            this.spinnerService.hide();
                            this.alertService.showError(response.error.message, ApiCode.ERROR);
                        });
                }
            });
        }
    }

    public openCuRole(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'default',
            nzTitle: actionType === ActionType.ADD ? 'Add Role' : 'Edit Role',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CURoleComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllRole({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

    public deleteRoleById(payload: any): void {
        this.spinnerService.show();
        this.rppService.deleteRoleById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllRole({
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

    public downloadRole(payload: any): void {
        this.spinnerService.show();
        this.rppService.downloadRole(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.commomService.downLoadFile(response);
                this.spinnerService.hide();
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // profile
    public fetchAllProfile(payload: any): any {
        this.spinnerService.show();
        this.rppService.fetchAllProfile(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.profileTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public buttonProfileActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuProfile(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllProfile({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.downloadProfile({
                sessionUser: {
                    username: this.sessionUser.username
                },
            });
        } else if (ActionType.UPLOAD === payload.action) {
            payload.action = 'Profile';
            const drawerRef = this.drawerService.create({
                nzTitle: 'Batch Operation',
                nzSize: 'default',
                nzMaskClosable: false,
                nzFooter: 'Note :- Add Xlsx File For Process, Once File Upload Successfully Click the Refresh Button',
                nzContent: BatchComponent,
                nzContentParams: {
                    batchDetail: payload
                }
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchAllProfile({
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
            });
        }
    }

    public tableProfileActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuProfile(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let profile: IProfile = {
                        id: payload.data.id,
                        profileName: payload.data.profileName,
                        description: payload.data.description,
                        status: APPLICATION_STATUS.DELETE
                    }
                    this.deleteProfileById({
                        ...profile,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        } else if (ActionType.LINK === payload.action) {
            this.drawerService.create({
                nzTitle: '[' + payload.data.id + '] ' + payload.data.profileName,
                nzWidth: 800,
                nzFooter: null, // Optional footer
                nzContent: PUCroseTableComponent,
                nzContentParams: {
                    profile: payload.data
                }
            });
        }
    }

    public extraProfileActionReciver(payload: any): void {
        if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.spinnerService.show();
                    this.rppService.deleteAllProfile({
                        ids: payload.checked,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    })
                        .pipe(first())
                        .subscribe((response: any) => {
                            this.spinnerService.hide();
                            if (response.status === ApiCode.ERROR) {
                                this.alertService.showError(response.message, ApiCode.ERROR);
                                return;
                            }
                            this.fetchAllProfile({
                                sessionUser: {
                                    username: this.sessionUser.username
                                }
                            });
                            this.setOfProfileCheckedId = new Set<any>();
                            this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                        }, (response: any) => {
                            this.spinnerService.hide();
                            this.alertService.showError(response.error.message, ApiCode.ERROR);
                        });
                }
            });
        }
    }

    public openCuProfile(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'default',
            nzTitle: actionType === ActionType.ADD ? 'Add Profile' : 'Edit Profile',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUProfileComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllProfile({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

    public deleteProfileById(payload: any): void {
        this.spinnerService.show();
        this.rppService.deleteProfileById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllProfile({
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

    public downloadProfile(payload: any): void {
        this.spinnerService.show();
        this.rppService.downloadProfile(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.commomService.downLoadFile(response);
                this.spinnerService.hide();
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    // permission
    public fetchAllPermission(payload: any): any {
        this.spinnerService.show();
        this.rppService.fetchAllPermission(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.permissionTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public buttonPermissionActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuPermission(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllPermission({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.downloadPermission({
                sessionUser: {
                    username: this.sessionUser.username
                },
            });
        } else if (ActionType.UPLOAD === payload.action) {
            payload.action = 'Permission';
            const drawerRef = this.drawerService.create({
                nzTitle: 'Batch Operation',
                nzSize: 'default',
                nzMaskClosable: false,
                nzFooter: 'Note :- Add Xlsx File For Process, Once File Upload Successfully Click the Refresh Button',
                nzContent: BatchComponent,
                nzContentParams: {
                    batchDetail: payload
                }
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchAllPermission({
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
            });
        }
    }

    public tablePermissionActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuPermission(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let permission: IPermission = {
                        id: payload.data.id,
                        permissionName: payload.data.permissionName,
                        description: payload.data.description,
                        status: APPLICATION_STATUS.DELETE
                    }
                    this.deletePermissionById({
                        ...permission,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        }
    }

    public extraPermissionActionReciver(payload: any): void {
        if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.spinnerService.show();
                    this.rppService.deleteAllPermission({
                        ids: payload.checked,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    })
                        .pipe(first())
                        .subscribe((response: any) => {
                            this.spinnerService.hide();
                            if (response.status === ApiCode.ERROR) {
                                this.alertService.showError(response.message, ApiCode.ERROR);
                                return;
                            }
                            this.fetchAllPermission({
                                sessionUser: {
                                    username: this.sessionUser.username
                                }
                            });
                            this.setOfPermissionCheckedId = new Set<any>();
                            this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                        }, (response: any) => {
                            this.spinnerService.hide();
                            this.alertService.showError(response.error.message, ApiCode.ERROR);
                        });
                }
            });
        }
    }

    public openCuPermission(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'default',
            nzTitle: actionType === ActionType.ADD ? 'Add Permission' : 'Edit Permission',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUPermissionComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllPermission({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

    public deletePermissionById(payload: any): void {
        this.spinnerService.show();
        this.rppService.deletePermissionById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllPermission({
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

    public downloadPermission(payload: any): void {
        this.spinnerService.show();
        this.rppService.downloadPermission(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.commomService.downLoadFile(response);
                this.spinnerService.hide();
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

}

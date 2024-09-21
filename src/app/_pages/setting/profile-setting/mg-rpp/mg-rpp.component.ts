import { Component, OnInit } from '@angular/core';
import {
    ApiCode,
    IStaticTable,
    ActionType,
    RPPService,
    AuthResponse,
    AuthenticationService
} from '../../../../_shared';
import {
    AlertService,
    CommomService
} from '../../../../_helpers';
import { first } from 'rxjs';
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

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-mg-rpp',
    templateUrl: './mg-rpp.component.html',
    styleUrls: ['./mg-rpp.component.css']
})
export class MgRPPComponent implements OnInit {

    public title = 'Role & Profile';
    public sessionUser: AuthResponse;
    // check id for role and profile and permission
    // role
    public setOfRoleCheckedId = new Set<any>();
    public roleTable: IStaticTable = this.initRoleStaticTable();
    // profile
    public setOfProfileCheckedId = new Set<any>();
    public profileTable: IStaticTable = this.initProfileStaticTable();
    // permission
    public setOfPermissionCheckedId = new Set<any>();
    public permissionTable: IStaticTable = this.initPermissionStaticTable();

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private rppService: RPPService,
        private alertService: AlertService,
        private commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.fetchAllRole({});
        this.fetchAllProfile({});
        this.fetchAllPermission({});
    }

    // role
    private initRoleStaticTable(): IStaticTable {
        return {
            tableUuid: this.commomService.uuid(), // uuid for table
            title: 'Mg Role',
            bordered: false,
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
                    type: 'form',
                    color: 'green',
                    spin: false,
                    tooltipTitle: 'Edit',
                    action: ActionType.EDIT
                },
                {
                    type: 'link',
                    color: 'orange',
                    spin: false,
                    tooltipTitle: 'Link With User',
                    action: ActionType.LINK
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
    }

    public buttonRoleActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuRole(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllRole({});
        } else if (ActionType.DOWNLOAD === payload.action) {
            if (payload.checked) {
                this.downloadRole({
                    uuids: payload.checked
                });
                return;
            }
            this.downloadRole({});
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
            drawerRef.afterClose
            .subscribe(data => {
                this.fetchAllRole({});
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
                    this.deleteRoleById({
                        uuid: payload.data.uuid
                    });
                }
            });
        } else if (ActionType.LINK === payload.action) {
            this.drawerService.create({
                nzWidth: 900,
                nzTitle: payload.data.name,
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
                    this.rppService.deleteAllRole({
                        uuids: payload.checked
                    }).pipe(first())
                    .subscribe((response: any) => 
                        this.handleApiResponse(response, () => {
                            this.fetchAllRole({});
                            this.setOfRoleCheckedId = new Set<any>();
                            this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                        })
                    );
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
        drawerRef.afterClose
        .subscribe(data => {
            this.fetchAllRole({});
        });
    }

    public fetchAllRole(payload: any): any {
        this.rppService.fetchAllRole(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.roleTable.dataSource = response.data;
                })
            );
    }

    public deleteRoleById(payload: any): void {
        this.rppService.deleteRoleById(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchAllRole({});
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                })
            );
    }

    public downloadRole(payload: any): void {
        this.rppService.downloadRole(payload).pipe(first())
            .subscribe((response: any) => {
                this.commomService.downLoadFile(response);
            });
    }

    // profile
    private initProfileStaticTable(): IStaticTable {
        return {
            tableUuid: this.commomService.uuid(), // uuid for table
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
                    type: 'form',
                    color: 'green',
                    spin: false,
                    tooltipTitle: 'Edit',
                    action: ActionType.EDIT
                },
                {
                    type: 'link',
                    color: 'orange',
                    spin: false,
                    tooltipTitle: 'Link With User',
                    action: ActionType.LINK
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
    }

    public buttonProfileActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuProfile(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllProfile({});
        } else if (ActionType.DOWNLOAD === payload.action) {
            if (payload.checked) {
                this.downloadProfile({
                    uuids: payload.checked
                });
                return;
            }
            this.downloadProfile({});
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
            drawerRef.afterClose
            .subscribe(data => {
                this.fetchAllProfile({});
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
                    this.deleteProfileById({
                        uuid: payload.data.uuid
                    });
                }
            });
        } else if (ActionType.LINK === payload.action) {
            this.drawerService.create({
                nzWidth: 900,
                nzTitle: payload.data.profileName,
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
                    this.rppService.deleteAllProfile({
                        uuids: payload.checked
                    }).pipe(first())
                    .subscribe((response: any) => 
                        this.handleApiResponse(response, () => {
                            this.fetchAllProfile({});
                            this.setOfProfileCheckedId = new Set<any>();
                            this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                        })
                    );
                }
            });
        }
    }

    public openCuProfile(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzTitle: actionType === ActionType.ADD ? 'Add Profile' : 'Edit Profile',
            nzSize: 'default',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUProfileComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose
        .subscribe(data => {
            this.fetchAllProfile({});
        });
    }

    public fetchAllProfile(payload: any): any {
        this.rppService.fetchAllProfile(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.profileTable.dataSource = response.data;
                })
            );
    }

    public deleteProfileById(payload: any): void {
        this.rppService.deleteProfileById(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchAllProfile({});
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                })
            );
    }

    public downloadProfile(payload: any): void {
        this.rppService.downloadProfile(payload).pipe(first())
            .subscribe((response: any) => {
                this.commomService.downLoadFile(response);
            });
    }

    // permission
    private initPermissionStaticTable(): IStaticTable {
        return {
            tableUuid: this.commomService.uuid(), // uuid for table
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
                    type: 'form',
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
    }

    public buttonPermissionActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuPermission(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllPermission({});
        } else if (ActionType.DOWNLOAD === payload.action) {
            if (payload.checked) {
                this.downloadPermission({
                    uuids: payload.checked
                });
                return;
            }
            this.downloadPermission({});
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
            drawerRef.afterClose
            .subscribe(data => {
                this.fetchAllPermission({});
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
                    this.deletePermissionById({
                        uuid: payload.data.uuid
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
                    this.rppService.deleteAllPermission({
                        uuids: payload.checked
                    }).pipe(first())
                    .subscribe((response: any) => 
                        this.handleApiResponse(response, () => {
                            this.fetchAllPermission({});
                            this.setOfPermissionCheckedId = new Set<any>();
                            this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                        })
                    );
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
        drawerRef.afterClose
        .subscribe(data => {
            this.fetchAllPermission({});
        });
    }

    public fetchAllPermission(payload: any): any {
        this.rppService.fetchAllPermission(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.permissionTable.dataSource = response.data;
                })
            );
    }

    public deletePermissionById(payload: any): void {
        this.rppService.deletePermissionById(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchAllPermission({});
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                })
            );
    }

    public downloadPermission(payload: any): void {
        this.rppService.downloadPermission(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.commomService.downLoadFile(response);
                })
            );
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}

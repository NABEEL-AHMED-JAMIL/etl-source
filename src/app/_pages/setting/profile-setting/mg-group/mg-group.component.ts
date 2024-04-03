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
    BatchComponent,
    CUGroupComponent
} from 'src/app/_pages';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    IGroup,
    IStaticTable,
    MgGroupService
} from 'src/app/_shared';


@Component({
    selector: 'app-mg-group',
    templateUrl: './mg-group.component.html',
    styleUrls: ['./mg-group.component.css']
})
export class MgGroupComponent implements OnInit {

    public sessionUser: AuthResponse;
    public uGroupTable: IStaticTable = {
        tableId: 'group_id',
        title: 'Mg Group',
        bordered: true,
        checkbox: false,
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
        dataColumn: [
            {
                field: 'name',
                header: 'Group Name',
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
            },
            {
                type: 'user',
                color: 'blue',
                spin: false,
                tooltipTitle: 'Add Lead User',
                action: ActionType.ADD
            },
            {
                type: 'usergroup-add',
                color: 'rgba(0, 0, 0, 0.85)',
                spin: false,
                tooltipTitle: 'Link With User',
                action: ActionType.LINK
            }
        ]
    };

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private commomService: CommomService,
        private spinnerService: SpinnerService,
        private mgGroupService: MgGroupService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchAllGroup({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all group
    public fetchAllGroup(payload: any): any {
        this.spinnerService.show();
        this.mgGroupService.fetchAllGroup(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.uGroupTable.dataSource = response.data;
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public deleteGroupById(payload: any): void {
        this.spinnerService.show();
        this.mgGroupService.deleteGroupById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllGroup({
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

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuEnVariable(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllGroup({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.spinnerService.show();
            this.mgGroupService.downloadGroup({
                sessionUser: {
                    username: this.sessionUser.username
                },
            })
            .pipe(first())
            .subscribe((response: any) => {
                this.commomService.downLoadFile(response);
                this.spinnerService.hide();
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
        } else if (ActionType.UPLOAD === payload.action) {
            payload.action = 'Group';
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
                this.fetchAllGroup({
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
            });
        }
    }

    public tableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuEnVariable(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let group: IGroup = {
                        id: payload.data.id,
                        name: payload.data.name,
                        description: payload.data.description
                    }
                    this.deleteGroupById({
                        ...group,
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
            nzTitle: actionType === ActionType.ADD ? 'Add Group' : 'Edit Group',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUGroupComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllGroup({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

}

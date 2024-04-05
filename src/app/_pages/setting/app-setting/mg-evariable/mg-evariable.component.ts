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
    CUEvariableComponent,
    EVUCroseTableComponent
} from 'src/app/_pages';
import {
    ApiCode,
    AuthResponse,
    IStaticTable,
    ActionType,
    AuthenticationService,
    EVariableService,
    IEnVariables
} from 'src/app/_shared';


@Component({
    selector: 'app-mg-evariable',
    templateUrl: './mg-evariable.component.html',
    styleUrls: ['./mg-evariable.component.css']
})
export class MgEVariableComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public setOfCheckedId = new Set<any>();
    public sessionUser: AuthResponse;
    public eVariableTable: IStaticTable = {
        tableId: 'variable_id',
        title: 'E-Variable',
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
                field: 'envKey',
                header: 'Env Key',
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
                subfield: ['id', 'username']
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
                subfield: ['id', 'username']
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
        ],
        moreActionType: [
            {
                title: 'Link With User',
                type: 'link',
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
        private eVariableService: EVariableService,
        private authenticationService: AuthenticationService) {
        this.endDate = this.commomService.getCurrentDate();
        this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchAllEnVariable({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllEnVariable(payload: any): any {
        this.spinnerService.show();
        this.eVariableService.fetchAllEnVariable(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.eVariableTable.dataSource = response.data;
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public deleteEnVariableById(payload: any): void {
        this.spinnerService.show();
        this.eVariableService.deleteEnVariableById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllEnVariable({
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
            this.fetchAllEnVariable({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.spinnerService.show();
            this.eVariableService.downloadEnVariable({
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
            payload.action = 'EVariable';
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
                this.fetchAllEnVariable({
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
                    let enVariable: IEnVariables = {
                        id: payload.data.id,
                        envKey: payload.data.envKey,
                        description: payload.data.description
                    }
                    this.deleteEnVariableById({
                        ...enVariable,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        } else if (ActionType.LINK === payload.action) {
            this.drawerService.create({
                nzTitle: '[' + payload.data.id + '] ' + payload.data.envKey,
                nzWidth: 1200,
                nzFooter: null, // Optional footer
                nzContent: EVUCroseTableComponent,
                nzContentParams: {
                    enVariable: payload.data
                }
            });
        }
    }

    public openCuEnVariable(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'large',
            nzTitle: actionType === ActionType.ADD ? 'Add EVariable' : 'Edit EVariable',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUEvariableComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllEnVariable({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

}

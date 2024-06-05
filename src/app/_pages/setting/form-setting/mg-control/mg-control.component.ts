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
    CUControlComponent,
    SttcLinkSttsComponent
} from 'src/app/_pages';
import {
    AuthResponse,
    IStaticTable,
    ActionType,
    AuthenticationService,
    FormSettingService,
    ApiCode,
    IGenControl
} from 'src/app/_shared';


@Component({
    selector: 'app-mg-control',
    templateUrl: './mg-control.component.html',
    styleUrls: ['./mg-control.component.css']
})
export class MgControlComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public setOfCheckedId = new Set<any>();
    //
    public sessionUser: AuthResponse;
    public genControlTable: IStaticTable = {
        tableId: 'control_id',
        title: 'Mg Control',
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
                field: 'controlName',
                header: 'Control Name',
                type: 'data'
            },
            {
                field: 'fieldName',
                header: 'Field Name',
                type: 'data'
            },
            {
                field: 'fieldType',
                header: 'Type',
                type: 'tag'
            },
            {
                field: 'fieldLkValue',
                header: 'LK Value',
                type: 'tag'
            },
            {
                field: 'mandatory',
                header: 'Mandatory',
                type: 'tag'
            },
            {
                field: 'isDefault',
                header: 'Default',
                type: 'tag'
            },
            {
                field: 'totalSection',
                header: 'Total Section',
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
                type: 'link',
                color: 'orange',
                spin: false,
                tooltipTitle: 'Link With Section',
                action: ActionType.LINK_SECTION
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
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private commomService: CommomService,
        private spinnerService: SpinnerService,
        private formSettingService: FormSettingService,
        private authenticationService: AuthenticationService) {
        this.endDate = this.commomService.getCurrentDate();
        this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchControls({
            startDate: this.startDate,
            endDate: this.endDate,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchControls(payload: any): any {
        this.spinnerService.show();
        this.formSettingService.fetchControls(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.genControlTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public deleteControlById(payload: any): void {
        this.spinnerService.show();
        this.formSettingService.deleteControlById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchControls({
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
            this.openCuControl(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let genControl: IGenControl = {
                        id: payload.data.id,
                        controlName: payload.data.controlName,
                        description: payload.data.description
                    }
                    this.deleteControlById({
                        ...genControl,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        } else if (ActionType.LINK_SECTION === payload.action) {
            const drawerRef = this.drawerService.create({
                nzTitle: '[Control] => [Section]',
                nzSize: 'large',
                nzWidth: 800,
                nzPlacement: 'right',
                nzMaskClosable: false,
                nzContent: SttcLinkSttsComponent,
                nzContentParams: {
                    actionType: payload.action,
                    editPayload: payload?.data
                }
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchControls({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
            });
        }
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuControl(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchControls({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.spinnerService.show();
            this.formSettingService.downloadSTTCommon({
                ids: payload.checked,
                startDate: this.startDate,
                endDate: this.endDate,
                downloadType: 'STT_CONTROL',
                sessionUser: {
                    username: this.sessionUser.username
                },
            })
                .pipe(first())
                .subscribe((response: any) => {
                    this.commomService.downLoadFile(response);
                    this.spinnerService.hide();
                }, (response: any) => {
                    this.spinnerService.hide();
                    this.alertService.showError(response.error.message, ApiCode.ERROR);
                });
        } else if (ActionType.UPLOAD === payload.action) {
            payload.action = 'Upload Control';
            const drawerRef = this.drawerService.create({
                nzTitle: 'Batch Operation',
                nzSize: 'default',
                nzMaskClosable: false,
                nzFooter: 'Note :- Add Xlsx File For Process, Once File Upload Successfully Click the Refresh Button',
                nzContent: BatchComponent,
                nzContentParams: {
                    batchDetail: {
                        action: 'STT_CONTROL'
                    }
                }
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchControls({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
            });
        }
    }

    public filterActionReciver(payload: any): void {
        this.startDate = payload.startDate;
        this.endDate = payload.endDate;
        this.fetchControls({
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
                    this.spinnerService.show();
                    this.formSettingService.deleteAllControls({
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
                            this.fetchControls({
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
            });
        }
    }

    public openCuControl(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzTitle: actionType === ActionType.ADD ? 'Add Control' : 'Edit Control',
            nzSize: 'large',
            nzWidth: 1200,
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUControlComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchControls({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

}
import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
    SpinnerService
} from 'src/app/_helpers';
import { BatchComponent, CUFormComponent, SttfLinkSttComponent, SttfLinkSttsComponent } from 'src/app/_pages';
import {
    AuthResponse,
    IStaticTable,
    ActionType,
    AuthenticationService,
    FormSettingService,
    ApiCode,
    IGenFrom
} from 'src/app/_shared';


@Component({
    selector: 'app-mg-form',
    templateUrl: './mg-form.component.html',
    styleUrls: ['./mg-form.component.css']
})
export class MGFormComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public setOfCheckedId = new Set<any>();
    //
    public sessionUser: AuthResponse;
    public genFormTable: IStaticTable = {
        tableId: 'form_id',
        title: 'Mg Form',
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
                field: 'formName',
                header: 'Form Name',
                type: 'data'
            },
            {
                field: 'homePage',
                header: 'Land Page',
                type: 'tag'
            },
            {
                field: 'serviceId',
                header: 'Service Id',
                type: 'data'
            },
            {
                field: 'formType',
                header: 'Form Type',
                type: 'tag'
            },
            {
                field: 'totalStt',
                header: 'Total STT',
                type: 'tag'
            },
            {
                field: 'totalSection',
                header: 'Total Section',
                type: 'tag'
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
                type: 'link',
                title: 'Link With STT',
                action: ActionType.LINK_STT
            },
            {
                type: 'link',
                title: 'Link With Section',
                action: ActionType.LINK_SECTION
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
        this.fetchForms({
            startDate: this.startDate,
            endDate: this.endDate,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchForms(payload: any): any {
        this.spinnerService.show();
        this.formSettingService.fetchForms(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.genFormTable.dataSource = response.data;
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public deleteFormById(payload: any): void {
        this.spinnerService.show();
        this.formSettingService.deleteFormById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchForms({
                    startDate: this.startDate,
                    endDate: this.endDate,
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

    public tableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuForm(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteFormById({
                        id: payload.data.id,
                        formName: payload.data.formName,
                        description: payload.data.description,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        } else if (ActionType.LINK_STT === payload.action) {
            const drawerRef = this.drawerService.create({
                nzTitle: 'Link Source Task Type',
                nzSize: 'large',
                nzWidth: 1200,
                nzPlacement: 'right',
                nzMaskClosable: false,
                nzContent: SttfLinkSttComponent,
                nzContentParams: {
                    actionType: payload.action,
                    editPayload: payload?.data
                }
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchForms({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
            });
        } else if (ActionType.LINK_SECTION === payload.action) {
            const drawerRef = this.drawerService.create({
                nzTitle: 'Link Section',
                nzSize: 'large',
                nzWidth: 1200,
                nzPlacement: 'right',
                nzMaskClosable: false,
                nzContent: SttfLinkSttsComponent,
                nzContentParams: {
                    actionType: payload.action,
                    editPayload: payload?.data
                }
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchForms({
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
            this.openCuForm(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchForms({
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
                downloadType: 'STT_FORM',
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
            payload.action = 'Upload Form';
            const drawerRef = this.drawerService.create({
                nzTitle: 'Batch Operation',
                nzSize: 'default',
                nzMaskClosable: false,
                nzFooter: 'Note :- Add Xlsx File For Process, Once File Upload Successfully Click the Refresh Button',
                nzContent: BatchComponent,
                nzContentParams: {
                    batchDetail: {
                        action: 'STT_FORM'
                    }
                }
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchForms({
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
        this.fetchForms({
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
                    this.formSettingService.deleteAllForms({
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
                            this.fetchForms({
                                startDate: this.startDate,
                                endDate: this.endDate,
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
            });
        }
    }

    public openCuForm(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'large',
            nzTitle: actionType === ActionType.ADD ? 'Add Form' : 'Edit Form',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUFormComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchForms({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

}
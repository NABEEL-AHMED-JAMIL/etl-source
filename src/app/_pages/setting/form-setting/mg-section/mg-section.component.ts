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
    CUSectionComponent,
    SttsLinkSttcComponent,
    SttsLinkSttfComponent
} from 'src/app/_pages';
import {
    AuthResponse,
    IStaticTable,
    ActionType,
    AuthenticationService,
    FormSettingService,
    ApiCode
} from 'src/app/_shared';


@Component({
    selector: 'app-mg-section',
    templateUrl: './mg-section.component.html',
    styleUrls: ['./mg-section.component.css']
})
export class MGSectionComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public setOfCheckedId = new Set<any>();
    //
    public sessionUser: AuthResponse;
    public genSectionTable: IStaticTable = {
        tableId: 'section_id',
        title: 'Mg Section',
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
                field: 'sectionName',
                header: 'Section Name',
                type: 'data'
            },
            {
                field: 'totalForm',
                header: 'Total Form',
                type: 'tag'
            },
            {
                field: 'totalControl',
                header: 'Total Control',
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
                title: 'Link With Form',
                action: ActionType.LINK_FROM
            },
            {
                type: 'link',
                title: 'Link With Control',
                action: ActionType.LINK_CONTROL
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
        this.fetchSections({
            startDate: this.startDate,
            endDate: this.endDate,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchSections(payload: any): any {
        this.spinnerService.show();
        this.formSettingService.fetchSections(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.genSectionTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public deleteSectionById(payload: any): void {
        this.spinnerService.show();
        this.formSettingService.deleteSectionById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchSections({
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
            this.openCuSection(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteSectionById({
                        id: payload.data.id,
                        sectionName: payload.data.sectionName,
                        description: payload.data.description,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        } else if (ActionType.LINK_FROM === payload.action) {
            const drawerRef = this.drawerService.create({
                nzTitle: '[Section] => [Form]',
                nzSize: 'large',
                nzWidth: 800,
                nzPlacement: 'right',
                nzMaskClosable: false,
                nzContent: SttsLinkSttfComponent,
                nzContentParams: {
                    actionType: payload.action,
                    editPayload: payload?.data
                }
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchSections({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
            });
        } else if (ActionType.LINK_CONTROL === payload.action) {
            const drawerRef = this.drawerService.create({
                nzTitle: '[Section] => [Control]',
                nzSize: 'large',
                nzWidth: 800,
                nzPlacement: 'right',
                nzMaskClosable: false,
                nzContent: SttsLinkSttcComponent,
                nzContentParams: {
                    actionType: payload.action,
                    editPayload: payload?.data
                }
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchSections({
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
            this.openCuSection(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchSections({
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
                downloadType: 'STT_SECTION',
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
            payload.action = 'Upload Section';
            const drawerRef = this.drawerService.create({
                nzTitle: 'Batch Operation',
                nzSize: 'default',
                nzMaskClosable: false,
                nzFooter: 'Note :- Add Xlsx File For Process, Once File Upload Successfully Click the Refresh Button',
                nzContent: BatchComponent,
                nzContentParams: {
                    batchDetail: {
                        action: 'STT_SECTION'
                    }
                }
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchSections({
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
        this.fetchSections({
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
                    this.formSettingService.deleteAllSections({
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
                        this.fetchSections({
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

    public openCuSection(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzTitle: actionType === ActionType.ADD ? 'Add Section' : 'Edit Section',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUSectionComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchSections({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

}
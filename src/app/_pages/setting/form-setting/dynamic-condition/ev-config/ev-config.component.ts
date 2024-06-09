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
    SCEnableabilityComponent,
    SCVisibilityComponent
} from 'src/app/_pages';
import {
    AuthResponse,
    IStaticTable,
    ActionType,
    EnableAndVisibilityService,
    AuthenticationService,
    ApiCode
} from 'src/app/_shared';


@Component({
    selector: 'app-ev-config',
    templateUrl: './ev-config.component.html',
    styleUrls: ['./ev-config.component.css']
})
export class EVConfigComponent implements OnInit {

    // Visibility
    public startDateVisibility: any;
    public endDateVisibility: any;
    public setOfVisibilityCheckedId = new Set<any>();
    // EnableChecked
    public startDateEnable: any;
    public endDateEnable: any;
    public setOfEnableCheckedId = new Set<any>();

    public sessionUser: AuthResponse;
    public visibilityTable: IStaticTable = {
        tableId: 'visibility_id',
        title: 'Mg Visibility',
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
        ]
    };
    public enableAbilityTable: IStaticTable = {
        tableId: 'role_id',
        title: 'Mg Enable',
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
        ]
    };

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private commomService: CommomService,
        private authenticationService: AuthenticationService,
        private enableAndVisibilityService: EnableAndVisibilityService) {
        // visibility
        this.endDateVisibility = this.commomService.getCurrentDate();
        this.startDateVisibility = this.commomService.getDate29DaysAgo(this.endDateVisibility);
        // data-enable
        this.endDateEnable = this.commomService.getCurrentDate();
        this.startDateEnable = this.commomService.getDate29DaysAgo(this.endDateEnable);
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchAllVisibility({
            startDate: this.startDateVisibility,
            endDate: this.endDateVisibility,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
        this.fetchAllEnableAbility({
            startDate: this.startDateEnable,
            endDate: this.endDateEnable,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all visibility
    public fetchAllVisibility(payload: any): any {
        this.spinnerService.show();
        this.enableAndVisibilityService.fetchAllVisibility(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.visibilityTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public deleteVisibilityById(payload: any): void {
        this.spinnerService.show();
        this.enableAndVisibilityService.deleteVisibilityById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllVisibility({
                    startDate: this.startDateVisibility,
                    endDate: this.endDateVisibility,
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

    public buttonVisibilityActionReciver(payload: any): void {
        debugger
        if (ActionType.ADD === payload.action) {
            this.openCuVisibilityForm(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllVisibility({
                startDate: this.startDateVisibility,
                endDate: this.endDateVisibility,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    public tableVisibilityActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuVisibilityForm(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteVisibilityById({
                        id: payload.data.id,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        }
    }

    public extraVisibilityActionReciver(payload: any): void {
        if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.spinnerService.show();
                    this.enableAndVisibilityService.deleteAllVisibility({
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
                        this.fetchAllVisibility({
                            startDate: this.startDateVisibility,
                            endDate: this.endDateVisibility,
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

    public openCuVisibilityForm(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'default',
            nzTitle: actionType === ActionType.ADD ? 'Add Visibility Logic' : 'Edit Visibility Logic',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: SCVisibilityComponent,
            nzContentParams: {
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllVisibility({
                startDate: this.startDateVisibility,
                endDate: this.endDateVisibility,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

    // fetch all enable ability
    public fetchAllEnableAbility(payload: any): any {
        this.spinnerService.show();
        this.enableAndVisibilityService.fetchAllEnableAbility(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.enableAbilityTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public deleteEnableAbilityById(payload: any): void {
        this.spinnerService.show();
        this.enableAndVisibilityService.deleteEnableAbilityById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllEnableAbility({
                    startDate: this.startDateEnable,
                    endDate: this.endDateEnable,
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

    public buttonEnableActionReciver(payload: any): void {
        debugger
        if (ActionType.ADD === payload.action) {
            this.openCuEnableForm(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllEnableAbility({
                startDate: this.startDateEnable,
                endDate: this.endDateEnable,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    public tableEnableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuEnableForm(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteEnableAbilityById({
                        id: payload.data.id,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        }
    }

    public extraEnableActionReciver(payload: any): void {
        if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.spinnerService.show();
                    this.enableAndVisibilityService.deleteAllEnableAbility({
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
                        this.fetchAllEnableAbility({
                            startDate: this.startDateEnable,
                            endDate: this.endDateEnable,
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

    public openCuEnableForm(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'default',
            nzTitle: actionType === ActionType.ADD ? 'Add Enable Logic' : 'Edit Enable Logic',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: SCEnableabilityComponent,
            nzContentParams: {
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllEnableAbility({
                startDate: this.startDateVisibility,
                endDate: this.endDateVisibility,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

}

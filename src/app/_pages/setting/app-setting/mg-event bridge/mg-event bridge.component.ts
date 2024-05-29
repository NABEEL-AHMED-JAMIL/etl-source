import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import {
    CUEventBridgeComponent,
    EBUCroseTableComponent
} from 'src/app/_pages';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    IStaticTable,
    IEventBridge,
    EvenBridgeService
} from 'src/app/_shared';


@Component({
    selector: 'app-mg-event bridge',
    templateUrl: './mg-event bridge.component.html',
    styleUrls: ['./mg-event bridge.component.css']
})
export class MgEventBridgeComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public setOfCheckedId = new Set<any>();
    public sessionUser: AuthResponse;
    public eventBridgeTable: IStaticTable = {
        tableId: 'eventBridge_id',
        title: 'Mg Event Bridge',
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
                field: 'bridgeUrl',
                header: 'Bridg Url',
                type: 'data'
            },
            {
                field: 'bridgeType',
                header: 'Bridg Type',
                type: 'tag'
            },
            {
                field: 'credential',
                header: 'Credential',
                type: 'combine',
                subfield: ['name'],
                status: 'status'
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
        ]
    };

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private evenBridgeService: EvenBridgeService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchAllEventBridge({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllEventBridge(payload: any): any {
        this.spinnerService.show();
        this.evenBridgeService.fetchAllEventBridge(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.eventBridgeTable.dataSource = response.data;
                const commonActions = [
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
                ];
                if (!this.hasAccess(this.sessionUser.roles, ['ROLE_MASTER_ADMIN'])) {
                    this.eventBridgeTable.actionType = commonActions;
                } else {
                    this.eventBridgeTable.actionType = [
                        {
                            type: 'link',
                            color: 'orange',
                            spin: false,
                            tooltipTitle: 'Link With User',
                            action: ActionType.LINK
                        },
                        ...commonActions
                    ];
                }
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public deleteEventBridgeById(payload: any): void {
        this.spinnerService.show();
        this.evenBridgeService.deleteEventBridgeById(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllEventBridge({
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
            this.openCuEventBridge(ActionType.EDIT, payload);
        } else if (ActionType.LINK === payload.action) {
            this.drawerService.create({
                nzTitle: '[' + payload.data.id + '] ' + payload.data.name,
                nzWidth: 800,
                nzFooter: null, // Optional footer
                nzContent: EBUCroseTableComponent,
                nzContentParams: {
                    eventBridge: payload.data
                }
            });
        }else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let eventBridge: IEventBridge = {
                        id: payload.data.id,
                        name: payload.data.name
                    }
                    this.deleteEventBridgeById({
                        ...eventBridge,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        }
    }

    public extraActionReciver(payload: any): void {
        if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteAllEventBridge(
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

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuEventBridge(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllEventBridge({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    public openCuEventBridge(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'large',
            nzTitle: actionType === ActionType.ADD ? 'Add Event Bridge' : 'Edit Event Bridge',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUEventBridgeComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllEventBridge({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

    public deleteAllEventBridge(payload: any): void {
        this.spinnerService.show();
        this.evenBridgeService.deleteAllEventBridge(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchAllEventBridge({
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
                this.setOfCheckedId = new Set<any>();
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public hasAccess(userRoles: any, targetRole: any) {
        return userRoles.some((role: any) => targetRole.includes(role));
    }

}

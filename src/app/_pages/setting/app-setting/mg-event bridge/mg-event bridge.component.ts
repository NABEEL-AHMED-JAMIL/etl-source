import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService
} from 'src/app/_helpers';
import {
    BatchComponent,
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

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-mg-event bridge',
    templateUrl: './mg-event bridge.component.html',
    styleUrls: ['./mg-event bridge.component.css']
})
export class MgEventBridgeComponent implements OnInit {
 
    // bridge detail
    public startDate: any;
    public endDate: any;
    public sessionUser: AuthResponse;
    public setOfCheckedId = new Set<any>();
    public eventBridgeTable = this.initStaticTable();

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private evenBridgeService: EvenBridgeService,
        private commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.fetchAllEventBridge({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    private initStaticTable(): IStaticTable {
        return {
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
                    field: 'bridgeType',
                    header: 'Bridg Type',
                    type: 'tag',
                    showImg: true
                },
                {
                    field: 'totalLinkCount',
                    header: 'In Use',
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
    }
    
    public tableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuEventBridge(ActionType.EDIT, payload);
        } else if (ActionType.LINK === payload.action) {
            this.drawerService.create({
                nzTitle: '[' + payload.data.id + '] ' + payload.data.name,
                nzWidth: 800,
                nzContent: EBUCroseTableComponent,
                nzContentParams: {
                    eventBridge: payload.data
                },
                nzFooter: null, // Optional footer
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

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuEventBridge(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllEventBridge({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.downloadEventBridge({
                ids: payload.checked,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ActionType.UPLOAD === payload.action) {
            payload.action = 'EventBridge'
            this.openBatchTemplate(payload);
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
                            ids: payload.checked
                        });
                }
            });
        }
    }

    public openBatchTemplate(payload: any): void {
        const drawerRef = this.drawerService.create({
            nzTitle: 'Batch Operation',
            nzSize: 'default',
            nzMaskClosable: false,
            nzContent: BatchComponent,
            nzContentParams: {
                batchDetail: payload
            },
            nzFooter: 'Note :- Add Xlsx File For Process, Once File Upload Successfully Click the Refresh Button'
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllEventBridge({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

    public openCuEventBridge(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzTitle: actionType === ActionType.ADD ? 'Add Event Bridge' : 'Edit Event Bridge',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzFooter: 'Note :- Once The Event Bridge Save You Can\t Change The Event Type.',
            nzContent: CUEventBridgeComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose
        .subscribe(data => {
            this.fetchAllEventBridge({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

    public downloadEventBridge(payload: any): void {
        this.evenBridgeService.downloadEventBridge(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.commomService.downLoadFile(response);
                }
            ));
    }

    public fetchAllEventBridge(payload: any): any {
        this.evenBridgeService.fetchAllEventBridge(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.eventBridgeTable.dataSource = response.data;
                    if (!this.commomService.hasRoleAccess(['ROLE_MASTER_ADMIN'])) {
                        this.eventBridgeTable.actionType = [
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
                        ];
                    } else {
                        this.eventBridgeTable.actionType = [
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
                    }
                }
            ));
    }

    public deleteEventBridgeById(payload: any): void {
        this.evenBridgeService.deleteEventBridgeById(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchAllEventBridge({
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                }
            ));
    }

    public deleteAllEventBridge(payload: any): void {
        this.evenBridgeService.deleteAllEventBridge(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchAllEventBridge({
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                    this.setOfCheckedId = new Set<any>();
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                }
            ));
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}

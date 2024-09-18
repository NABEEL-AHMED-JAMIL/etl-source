import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService
} from 'src/app/_helpers';
import {
    CuSourceTTypeComponent,
    SttLinkFormComponent
} from 'src/app/_pages';
import {
    AuthResponse,
    IStaticTable,
    ActionType,
    AuthenticationService,
    SourceTaskTypeService,
    ApiCode
} from 'src/app/_shared';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-source-ttype',
    templateUrl: 'source-ttype.component.html',
    styleUrls: ['source-ttype.component.css']
})
export class MgSourceTaskTypeComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public setOfCheckedId = new Set<any>();

    public sessionUser: AuthResponse;
    public sttTable = this.initializeTable();

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private commomService: CommomService,
        private sourceTaskTypeService: SourceTaskTypeService,
        private authenticationService: AuthenticationService) {
        this.endDate = this.commomService.getCurrentDate();
        this.startDate = this.commomService.getDate364DaysAgo(this.endDate);
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit() {
        this.fetchAllSTT({
            startDate: this.startDate,
            endDate: this.endDate,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    private initializeTable(): IStaticTable {
        return {
            tableUuid: this.commomService.uuid(),
            title: 'Mg Source Task Type',
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
            dataColumn: [
                {
                    field: 'serviceName',
                    header: 'Service Name',
                    type: 'data'
                },
                {
                    field: 'taskType',
                    header: 'Task Type',
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
                    field: 'totalTask',
                    header: 'Total Task',
                    type: 'tag'
                },
                {
                    field: 'totalForm',
                    header: 'Total Form',
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
            extraHeaderButton: [
                {
                    title: 'Delete All',
                    type: 'delete',
                    action: ActionType.DELETE
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
                    tooltipTitle: 'Link With Form',
                    action: ActionType.LINK_FROM
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
    };

    public tableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuLookup(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteSTT({
                        id: payload.data.id,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        } else if (ActionType.LINK_FROM === payload.action) {
            const drawerRef = this.drawerService.create({
                nzTitle: '[STT] => [Form]',
                nzSize: 'large',
                nzWidth: 800,
                nzPlacement: 'right',
                nzMaskClosable: false,
                nzContent: SttLinkFormComponent,
                nzContentParams: {
                    actionType: payload.action,
                    editPayload: payload?.data
                }
            });
            drawerRef.afterClose
            .subscribe(data => {
                this.fetchAllSTT({
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
            this.openCuLookup(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllSTT({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    public filterActionReciver(payload: any): void {
        this.startDate = payload.startDate;
        this.endDate = payload.endDate;
        this.fetchAllSTT({
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
                    this.deleteAllSTT({
                        ids: payload.checked,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        }
    }

    public openCuLookup(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'large',
            nzTitle: actionType === ActionType.ADD ? 'Add STT' : 'Edit STT',
            nzFooter: 'Note :- Once Source Task Type Created, Task Type Will Not Change',
            nzPlacement: 'right',
            nzWidth: 800,
            nzMaskClosable: false,
            nzContent: CuSourceTTypeComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose
        .subscribe(data => {
            this.fetchAllSTT({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

     // fetch all lookup
     public fetchAllSTT(payload: any): any {
        this.sourceTaskTypeService.fetchAllSTT(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.sttTable.dataSource = response.data;
                })
            );
    }

    public deleteSTT(payload: any): void {
        this.sourceTaskTypeService.deleteSTT(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchAllSTT({
                        startDate: this.startDate,
                        endDate: this.endDate,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                })    
            );
    }

    public deleteAllSTT(payload: any): void {
        this.sourceTaskTypeService.deleteAllSTT(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchAllSTT({
                        startDate: this.startDate,
                        endDate: this.endDate,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                    this.setOfCheckedId = new Set<any>();
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
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
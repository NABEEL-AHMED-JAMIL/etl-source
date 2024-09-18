import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CuSourceTaskComponent } from 'src/app/_pages';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
} from 'src/app/_helpers';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    SourceTaskService,
    IStaticTable
} from 'src/app/_shared';


/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-source-task',
    templateUrl: 'source-task.component.html',
    styleUrls: ['source-task.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MgSourceTaskComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public sessionUser: AuthResponse;
    public setOfCheckedId = new Set<any>();
    public sourceTaskTable: IStaticTable = this.initializeTable();

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        public commomService: CommomService,
        private sourceTaskService: SourceTaskService,
        private authenticationService: AuthenticationService) {
        this.endDate = this.commomService.getCurrentDate();
        this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.fetchAllSourceTask({
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
            title: 'Mg Source Task',
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
                    field: 'taskName',
                    header: 'Task Name',
                    type: 'data'
                },
                {
                    field: 'sourceTaskType',
                    header: 'Task Type',
                    type: 'combine',
                    subfield: ['serviceName']
                },
                {
                    field: 'formData',
                    header: 'Form',
                    type: 'combine',
                    subfield: ['name']
                },
                {
                    field: 'totalJob',
                    header: 'Total Job',
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
                }
            ]
        };
    }

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
                    this.deleteSourceTask({
                        id: payload.data.id,
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
            this.openCuLookup(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllSourceTask({
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
        this.fetchAllSourceTask({
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
                    this.deleteAllSourceTask(
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

    public openCuLookup(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'large',
            nzTitle: actionType === ActionType.ADD ? 'Add Source Task' : 'Edit Source Task',
            nzFooter: 'Note: Once Source Task Created, Task Type Will Not Change',
            nzPlacement: 'right',
            nzWidth: 800,
            nzMaskClosable: false,
            nzContent: CuSourceTaskComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose
        .subscribe(data => {
            this.fetchAllSourceTask({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

     // fetch all lookup
     public fetchAllSourceTask(payload: any): any {
        this.sourceTaskService.fetchAllSourceTask(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.sourceTaskTable.dataSource = response.data;
                })
        );
    }

    public deleteSourceTask(payload: any): void {
        this.sourceTaskService.deleteSourceTask(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchAllSourceTask({
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

    public deleteAllSourceTask(payload: any): void {
        this.sourceTaskService.deleteAllSourceTask(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchAllSourceTask({
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
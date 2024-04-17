import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertService, CommomService, SpinnerService } from 'src/app/_helpers';
import { AuthResponse, IStaticTable, ActionType, AuthenticationService, FormSettingService } from 'src/app/_shared';

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
    public sttTable: IStaticTable = {
        tableId: 'stt_id',
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
                field: 'credentail',
                header: 'Credentail',
                type: 'tag'
            },
            {
                field: 'totalSourceTask',
                header: 'Total Task',
                type: 'tag'
            },
            {
                field: 'totalGroup',
                header: 'Total Group',
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

    ngOnInit() {
    }

    public tableActionReciver(payload: any): void {
    }

    public buttonActionReciver(payload: any): void {
    }

    public filterActionReciver(payload: any): void {
    }

    public extraActionReciver(payload: any): void {
    }

}
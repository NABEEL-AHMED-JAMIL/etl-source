import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService
} from 'src/app/_helpers';
import {
    APPLICATION_STATUS,
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    IReportSetting,
    IStaticTable,
    ReportSettingService
} from 'src/app/_shared';
import {
    CUReportComponent
} from '../mg-cu/cu-report/cu-report.component';


@Component({
    selector: 'app-mg-report',
    templateUrl: './mg-report.component.html',
    styleUrls: ['./mg-report.component.css']
})
export class MgReportComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public sessionUser: AuthResponse;
    public setOfCheckedId = new Set<any>();
    public reportSettingTable: IStaticTable = {
        tableId: 'report_id',
        title: 'Mg Report',
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
                field: 'groupType',
                header: 'Group Type',
                type: 'tag'
            },
            {
                field: 'payloadRef',
                header: 'Payload Ref',
                type: 'tag',
                showImg: true
            },
            {
                field: 'distinctLKValue',
                header: 'Distinct Value',
                type: 'tag'
            },
            {
                field: 'aggLKValue',
                header: 'Aggregation',
                type: 'tag'
            },
            {
                field: 'dateFilter',
                header: 'Is Filter',
                type: 'tag'
            },
            {
                field: 'recordReport',
                header: 'Recoard Report',
                type: 'tag'
            },
            {
                field: 'isPdf',
                header: 'Pdf File',
                type: 'tag'
            },
			{
                field: 'isXlsx',
                header: 'Xlsx File',
                type: 'tag'
            },
			{
                field: 'isCsv',
                header: 'Csv File',
                type: 'tag'
            },
            {
                field: 'isData',
                header: 'Data File',
                type: 'tag'
            },
			{
                field: 'isFirstDimension',
                header: '1st Dim',
                type: 'tag'
            },
			{
                field: 'isSecondDimension',
                header: '2nd Dim',
                type: 'tag'
            },
            {
                field: 'fetchRate',
                header: 'Rate Limit',
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
                type: 'form',
                color: 'green',
                spin: false,
                tooltipTitle: 'Edit',
                action: ActionType.EDIT
            },
            {
                type: 'eye',
                color: 'orange',
                spin: false,
                tooltipTitle: 'View Report',
                action: ActionType.VIEW
            },
            {
                type: 'file-done',
                color: 'black',
                spin: false,
                tooltipTitle: 'View Recoard Report',
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
    };

    constructor(
        private router: Router,
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private commomService: CommomService,
        private reportSettingService: ReportSettingService,
        private authenticationService: AuthenticationService) {
        this.endDate = this.commomService.getCurrentDate();
        this.startDate = this.commomService.getDate364DaysAgo(this.endDate);
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.fetchAllReportSetting({
            startDate: this.startDate,
            endDate: this.endDate,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public tableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuEnVariable(ActionType.EDIT, payload);
        } else if (ActionType.VIEW === payload.action) {
            if (payload.data.groupType && payload.data.status.lookupCode === APPLICATION_STATUS.ACTIVE) {
                this.router.navigate(['/report/viewReport'], { queryParams: { reportId: payload.data.id } });
            } else if (payload.data.status.lookupCode !== APPLICATION_STATUS.ACTIVE) {
                this.alertService.showInfo('Please Activ Report.', ApiCode.ERROR);                
            } else {
                this.alertService.showInfo('Please Link Report Group.', ApiCode.ERROR);
            }
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let report: IReportSetting = {
                        id: payload.data.id,
                        name: payload.data.name,
                        description: payload.data.description
                    }
                    this.deleteReportSettingById({
                        ...report,
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
            this.openCuEnVariable(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllReportSetting({
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
        this.fetchAllReportSetting({
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
                    this.deleteAllReportSetting(
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

    public openCuEnVariable(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'large',
            nzWidth: 900,
            nzTitle: actionType === ActionType.ADD ? 'Add Report' : 'Edit Report',
            nzFooter: '*Note: For Service Output Pattern Please Download The Above Documentation.',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUReportComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose
        .subscribe(data => {
            this.fetchAllReportSetting({
                startDate: this.startDate,
                endDate: this.endDate,
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

     // fetch all lookup
     public fetchAllReportSetting(payload: any): any {
        this.reportSettingService.fetchAllReportSetting(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.reportSettingTable.dataSource = response.data;
                })
            );
    }

    public deleteReportSettingById(payload: any): void {
        this.reportSettingService.deleteReportSettingById(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchAllReportSetting({
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

    public deleteAllReportSetting(payload: any): void {
        this.reportSettingService.deleteAllReportSetting(payload).pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.fetchAllReportSetting({
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

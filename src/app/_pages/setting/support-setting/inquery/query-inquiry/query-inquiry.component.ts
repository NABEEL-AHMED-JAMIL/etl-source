import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { CUQueryInquiryComponent } from '../../../../index';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
    ApiCode,
    IStaticTable,
    ActionType,
    SettingService,
    AuthResponse,
    IKeyValue,
    AuthenticationService,
    APP_ADMIN,
} from '../../../../../_shared';
import {
    AlertService,
    CommomService,
    SpinnerService
} from '../../../../../_helpers';


@Component({
    selector: 'app-query-inquiry',
    templateUrl: './query-inquiry.component.html',
    styleUrls: ['./query-inquiry.component.css']
})
export class QueryInquiryComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public sessionUser: AuthResponse;
    public sessionUserRoles: any;
    public setOfCheckedId = new Set<any>();
    public queryInQuiryTable: IStaticTable = this.initializeTable();
    // user list response
    public selectedUser: any;
    public isSuperAdmin: boolean = false;
    public accessUserList: IKeyValue[] = [];

    constructor(
        private modalService: NzModalService,
        private commomService: CommomService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private settingService: SettingService,
        private authenticationService: AuthenticationService) {
            this.endDate = this.commomService.getCurrentDate();
            this.startDate = this.commomService.getDate364DaysAgo(this.endDate);
            this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
                this.sessionUserRoles = currentUser.roles;
                if (this.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
                    this.isSuperAdmin = true;
                    this.selectedUser = this.sessionUser.username;
                }
            });
    }

    ngOnInit(): void {
        if (this.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
            this.fetchAllQueryInquiryAccessUser();
        }
        this.queryInquiryFetch();
    }

    private initializeTable(): IStaticTable {
        return {
            tableId: 'query_inquiry_id',
            title: 'Mg Query Inquiry',
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
                    field: 'dateUpdated',
                    header: 'Updated',
                    type: 'date'
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
                    type: 'delete',
                    color: 'red',
                    spin: false,
                    tooltipTitle: 'Delete',
                    action: ActionType.DELETE
                }
            ]
        };
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuLookup(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            if (this.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
                this.fetchAllQueryInquiryAccessUser();
            }
            this.queryInquiryFetch();
        }
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
                    this.deleteQueryInquiryById({
                        uuid: payload.data.uuid
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
                    this.deleteAllQueryInquiry(
                        {
                            uuids: payload.checked
                        });
                }
            });
        }
    }

    public filterActionReciver(payload: any): void {
        this.startDate = payload.startDate;
        this.endDate = payload.endDate;
        this.queryInquiryFetch();
    }

    public openCuLookup(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.modalService.create({
            nzTitle: actionType === ActionType.ADD ? 'Add Query InQuiry' : 'Edit Query InQuiry',
            nzMaskClosable: false,
            nzContent: CUQueryInquiryComponent,
            nzComponentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            },
            nzFooter: null // Set the footer to null to hide it
        });
        drawerRef.afterClose
        .subscribe(data => {
            if (this.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
                this.fetchAllQueryInquiryAccessUser();
            }
            this.queryInquiryFetch();
        });
    }

    public fetchAllQueryInquiry(payload: any): any {
        this.spinnerService.show();
        this.settingService.fetchAllQueryInquiry(payload).pipe(first())
            .subscribe((response: any) => this.handleApiResponse(response, () => {
                this.queryInQuiryTable.dataSource = response.data;
            }), (response: any) => this.handleError(response));
    }
    
    public deleteQueryInquiryById(payload: any): void {
        this.spinnerService.show();
        this.settingService.deleteQueryInquiryById(payload).pipe(first())
            .subscribe((response: any) => this.handleApiResponse(response, () => {
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                if (this.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
                    this.fetchAllQueryInquiryAccessUser();
                }
                this.queryInquiryFetch();
            }), (response: any) => this.handleError(response));
    }

    public deleteAllQueryInquiry(payload: any): void {
        this.spinnerService.show();
        this.settingService.deleteAllQueryInquiry(payload).pipe(first())
            .subscribe((response: any) => this.handleApiResponse(response, () => {
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                if (this.hasRoleAccess([APP_ADMIN.ROLE_MASTER_ADMIN])) {
                    this.fetchAllQueryInquiryAccessUser();
                }
                this.queryInquiryFetch();
                this.setOfCheckedId = new Set<any>();
            }), (response: any) => this.handleError(response));
    }

    public fetchAllQueryInquiryAccessUser(): void {
        this.spinnerService.show();
        this.settingService.fetchAllQueryInquiryAccessUser().pipe(first())
            .subscribe((response: any) => this.handleApiResponse(response, () => {
                this.accessUserList = response.data.map((user: any) => {
                    return {
                        name: `${user.fullname} & Querys [${user.count}]`,
                        value: user.username
                    };
                });
            }), (response: any) => this.handleError(response));
    }

    public onSelectionUserChange(): void {
        // Handle the selection change here
        this.queryInquiryFetch();
    }

    public queryInquiryFetch() {
        const query: {
            startDate: any;
            endDate: any;
            usernames?: string[]; // Optional property
        } = {
            startDate: this.startDate,
            endDate: this.endDate,
        };
        if (this.selectedUser) {
            query.usernames = [this.selectedUser];
        }
        this.fetchAllQueryInquiry(query); 
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        this.spinnerService.hide();
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }
    
    private handleError(response: any): void {
        this.spinnerService.hide();
        this.alertService.showError(response.error.message, ApiCode.ERROR);
    }

    public hasRoleAccess(userRole: any): boolean {
        return this.sessionUserRoles.some((role: any) => userRole.includes(role));
    }

}
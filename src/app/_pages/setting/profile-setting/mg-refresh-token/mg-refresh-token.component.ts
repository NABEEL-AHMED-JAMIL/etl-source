import { Component, OnInit } from '@angular/core';
import {
    ApiCode,
    IStaticTable,
    ActionType,
    RefreshTokenService,
    AuthResponse,
    AuthenticationService
} from '../../../../_shared';
import { first } from 'rxjs';
import { AlertService, CommomService, SpinnerService } from '../../../../_helpers';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
    selector: 'app-mg-refresh-token',
    templateUrl: './mg-refresh-token.component.html',
    styleUrls: ['./mg-refresh-token.component.css']
})
export class MgRefreshTokenComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public setOfCheckedId = new Set<any>();
    //
    public sessionUser: AuthResponse;
    public refreshTokenTable: IStaticTable = {
        tableId: 'refresh_id',
        title: 'Refresh Token',
        bordered: true,
        checkbox: true,
        size: 'small',
        headerButton: [
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
                field: 'token',
                header: 'Token',
                type: 'data'
            },
            {
                field: 'expiryDate',
                header: 'Expiry Date',
                type: 'date'
            },
            {
                field: 'ipAddress',
                header: 'IP Address',
                type: 'data'
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
                type: 'delete',
                color: 'red',
                spin: false,
                tooltipTitle: 'Delete',
                action: ActionType.DELETE
            }
        ]
    };

    constructor(
        private modalService: NzModalService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        public commomService: CommomService,
        private refreshTokenService: RefreshTokenService,
        private authenticationService: AuthenticationService) {
            this.endDate = this.commomService.getCurrentDate();
            this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
            this.authenticationService.currentUser
                .subscribe(currentUser => {
                    this.sessionUser = currentUser;
                });
    }

    ngOnInit(): void {
        this.fetchByAllRefreshToken({
            startDate: this.startDate,
            endDate: this.endDate
        });
    }

    // fetch all lookup
    public fetchByAllRefreshToken(payload: any): any {
        this.spinnerService.show();
        this.refreshTokenService.fetchByAllRefreshToken(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.refreshTokenTable.dataSource = response.data;
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public deleteRefreshToken(payload: any): void {
        this.spinnerService.show();
        this.refreshTokenService.deleteRefreshToken(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchByAllRefreshToken({
                    startDate: this.startDate,
                    endDate: this.endDate
                });
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.RE_FRESH === payload.action) {
            this.fetchByAllRefreshToken({
                startDate: this.startDate,
                endDate: this.endDate
            });
        }
    }

    public tableActionReciver(payload: any): void {
        if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteRefreshToken({
                        refreshToken: payload.data.token
                    });
                }
            });
        }
    }

    public filterActionReciver(payload: any): void {
        this.startDate = payload.startDate;
        this.endDate = payload.endDate;
        this.fetchByAllRefreshToken({
            startDate: this.startDate,
            endDate: this.endDate
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
                    this.deleteAllRefreshToken(
                        {
                            ids: payload.checked
                        });
                }
            });
        }
    }

    public deleteAllRefreshToken(payload: any): void {
        this.spinnerService.show();
        this.refreshTokenService.deleteAllRefreshToken(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchByAllRefreshToken({
                    startDate: this.startDate,
                    endDate: this.endDate
                });
                this.setOfCheckedId = new Set<any>();
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

}

import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
    SpinnerService
} from 'src/app/_helpers';
import {
    ApiCode,
    AuthResponse,
    AuthenticationService,
    IEventBridge,
    IStaticTable,
    EvenBridgeService,
    ActionType
} from 'src/app/_shared';


@Component({
    selector: 'app-ebu-crose-table',
    templateUrl: './ebu-crose-table.component.html',
    styleUrls: ['./ebu-crose-table.component.css']
})
export class EBUCroseTableComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public searchDetails: any;
    public sessionUser: AuthResponse;

    @Input()
    public eventBridge: IEventBridge;

    public eventBridgeLinkUserTable: IStaticTable = {
        tableId: 'eventBridge_link_user_id',
        title: 'Event Bridge Link User',
        bordered: true,
        checkbox: false,
        enableAction: true,
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
        dataColumn: [
            {
                field: 'fullName',
                header: 'Name',
                type: 'data'
            },
            {
                field: 'email',
                header: 'Email',
                type: 'data'
            },
            {
                field: 'username',
                header: 'Username',
                type: 'data'
            },
            {
                field: 'profile',
                header: 'Profile',
                type: 'combine',
                subfield: ['description']
            },
            {
                field: 'tokenId',
                header: 'TokenId',
                type: 'data'
            },
            {
                field: 'expireTime',
                header: 'Expire Time',
                type: 'date'
            },
            {
                field: 'linkStatus',
                header: 'Status',
                type: 'tag'
            }
        ],
        actionType: [
            {
                type: 'download',
                color: '#11315f',
                spin: false,
                tooltipTitle: 'Download',
                action: ActionType.DOWNLOAD
            },
            {
                type: 'sync',
                color: 'orange',
                spin: false,
                tooltipTitle: 'Gernate Token',
                action: ActionType.GEN_TOKEN
            }
        ]
    };

    constructor(
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private evenBridgeService: EvenBridgeService,
        private commomService: CommomService,
        private modalService: NzModalService,
        private authenticationService: AuthenticationService) {
            this.endDate = this.commomService.getCurrentDate();
            this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
            this.authenticationService.currentUser
                .subscribe(currentUser => {
                    this.sessionUser = currentUser;
                });
    }

    ngOnInit(): void {
        this.fetchLinkEventBridgeWitUser({
            startDate: this.startDate,
            endDate: this.endDate,
            id: this.eventBridge.id
        });
    }

    public fetchLinkEventBridgeWitUser(payload: any): any {
        this.spinnerService.show();
        this.evenBridgeService.fetchLinkEventBridgeWitUser(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.eventBridgeLinkUserTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);;
            });
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.RE_FRESH === payload.action) {
            this.fetchLinkEventBridgeWitUser({
                startDate: this.startDate,
                endDate: this.endDate,
                id: this.eventBridge.id
            });
        }
    }

    public enableActionReciver(payload: any): void {
        this.spinnerService.show();
        this.evenBridgeService.linkEventBridgeWithUser({
            id: this.eventBridge.id,
            appUserId: payload.id,
            linked: payload.linked
        })
        .pipe(first())
        .subscribe((response: any) => {
            this.spinnerService.hide();
            if (response.status === ApiCode.ERROR) {
                payload.linked = !payload.linked;
                this.alertService.showError(response.message, ApiCode.ERROR);
                return;
            }
            // if deletein
            payload.tokenId = response.data.tokenId;
            payload.expireTime = response.data.expireTime;
            payload.accessToken = response.data.accessToken;
        }, (response: any) => {
            this.spinnerService.hide();
            this.alertService.showError(response.error.message, ApiCode.ERROR);;
        });
    }

    public tableActionReciver(payload: any): void {
        if (ActionType.GEN_TOKEN === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to genrate the token?',
                nzContent: 'Press \'Ok\' will generate the new token.',
                nzOnOk: () => {
                    this.genEventBridgeToken(payload);
                }
            });
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to genrate the token file?',
                nzContent: 'Press \'Ok\' will generate the file.',
                nzOnOk: () => {
                    this.commomService.createFile(payload.data);
                }
            });
        }
    }

    public genEventBridgeToken(payload: any): void {
        this.spinnerService.show();
        this.evenBridgeService.genEventBridgeToken({
            tokenId: payload.data.tokenId
        })
        .pipe(first())
        .subscribe((response: any) => {
            this.spinnerService.hide();
            if (response.status === ApiCode.ERROR) {
                this.alertService.showError(response.message, ApiCode.ERROR);
                return;
            }
            payload.data.tokenId = response.data.tokenId;
            payload.data.expireTime = response.data.expireTime;
            payload.data.accessToken = response.data.accessToken;
        }, (response: any) => {
            this.spinnerService.hide();
            this.alertService.showError(response.error.message, ApiCode.ERROR);;
        });
    }

    public filterActionReciver(payload: any): void {
        this.startDate = payload.startDate;
        this.endDate = payload.endDate;
        this.fetchLinkEventBridgeWitUser({
            startDate: this.startDate,
            endDate: this.endDate,
            id: this.eventBridge.id
        });
    }

}

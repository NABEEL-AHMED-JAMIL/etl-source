import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
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

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-ebu-crose-table',
    templateUrl: './ebu-crose-table.component.html',
    styleUrls: ['./ebu-crose-table.component.css']
})
export class EBUCroseTableComponent implements OnInit {

    @Input()
    public eventBridge: IEventBridge;

    public startDate: any;
    public endDate: any;
    public searchDetails: any;
    public sessionUser: AuthResponse;
    public eventBridgeLinkUserTable = this.initStaticTable();

    constructor(
        private alertService: AlertService,
        private commomService: CommomService,
        private modalService: NzModalService,
        private evenBridgeService: EvenBridgeService,
        private authenticationService: AuthenticationService) {
        this.endDate = this.commomService.getCurrentDate();
        this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.fetchLinkEventBridgeWitUser({
            startDate: this.startDate,
            endDate: this.endDate,
            id: this.eventBridge.id
        });
    }

    private initStaticTable(): IStaticTable {
        return {
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
        }
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
        this.evenBridgeService.linkEventBridgeWithUser({
            id: this.eventBridge.id,
            appUserId: payload.id,
            linked: payload.linked
        }).pipe(first())
        .subscribe((response: any) => 
            this.handleApiResponse(response, () => {
                payload.tokenId = response.data.tokenId;
                payload.expireTime = response.data.expireTime;
                payload.accessToken = response.data.accessToken;
            }
        ));
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

    public fetchLinkEventBridgeWitUser(payload: any): any {
        this.evenBridgeService.fetchLinkEventBridgeWitUser(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.eventBridgeLinkUserTable.dataSource = response.data;
                }
            ));
    }

    public genEventBridgeToken(payload: any): void {
        this.evenBridgeService.genEventBridgeToken({
            tokenId: payload.data.tokenId
        }).pipe(first())
        .subscribe((response: any) => 
            this.handleApiResponse(response, () => {
                payload.data.tokenId = response.data.tokenId;
                payload.data.expireTime = response.data.expireTime;
                payload.data.accessToken = response.data.accessToken;
            }
        ));
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

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}

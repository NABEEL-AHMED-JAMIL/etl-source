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
    IWebHook,
    IStaticTable,
    WebHookService,
    ActionType
} from 'src/app/_shared';


@Component({
    selector: 'app-hku-crose-table',
    templateUrl: './hku-crose-table.component.html',
    styleUrls: ['./hku-crose-table.component.css']
})
export class HKUCroseTableComponent implements OnInit {

    public searchDetails: any;
    public sessionUser: AuthResponse;

    @Input()
    public webHook: IWebHook;

    public webHookLinkUserTable: IStaticTable = {
        tableId: 'webhook_link_user_id',
        title: 'WebHook Link User',
        bordered: true,
        checkbox: false,
        enableAction: true,
        size: 'small',
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
                subfield: ['profileName']
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
        private webHookService: WebHookService,
        private commomService: CommomService,
        private modalService: NzModalService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchLinkWebHookWitUser({
            id: this.webHook.id
        });
    }

    public fetchLinkWebHookWitUser(payload: any): any {
        this.spinnerService.show();
        this.webHookService.fetchLinkWebHookWitUser(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.webHookLinkUserTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);;
            });
    }

    public enableActionReciver(payload: any): void {
        this.spinnerService.show();
        this.webHookService.linkWebHookWithUser({
            id: this.webHook.id,
            appUserId: payload.id,
            linked: payload.linked
        })
        .pipe(first())
        .subscribe((response: any) => {
            this.spinnerService.hide();
            if (response.status === ApiCode.ERROR) {
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
                    this.genWebHookToken(payload);
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

    public genWebHookToken(payload: any): void {
        this.spinnerService.show();
        this.webHookService.genWebHookToken({
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

}

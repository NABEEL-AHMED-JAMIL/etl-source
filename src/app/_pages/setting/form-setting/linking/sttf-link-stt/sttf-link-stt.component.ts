import { Component, Input, OnInit } from '@angular/core';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
    SpinnerService
} from 'src/app/_helpers';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    FormSettingService,
    IGenFrom, 
    SERVER_ACTION
} from 'src/app/_shared';


@Component({
    selector: 'app-sttf-link-stt',
    templateUrl: './sttf-link-stt.component.html',
    styleUrls: ['./sttf-link-stt.component.css']
})
export class SttfLinkSttComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenFrom;

    public sessionUser: AuthResponse;
    // transfer
    public fromLinkSTTLink: TransferItem[] = [];

    constructor(
        private alertService: AlertService,
        public commomService: CommomService,
        private spinnerService: SpinnerService,
        private formSettingService: FormSettingService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchAllFormLinkSTT({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public refresh(): void {
        this.fetchAllFormLinkSTT({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllFormLinkSTT(payload: any): any {
        const fromLinkSTT: TransferItem[] = [];
        this.spinnerService.show();
        this.formSettingService.fetchAllFormLinkSTT(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                if (response.data) {
                    let index = 0;
                    let linkData = response.data;
                    while (index < linkData.length) {
                        let item: TransferItem = {
                            title: linkData[index].serviceName,
                            description: linkData[index].taskType,
                            direction: linkData[index].linkStatus ? 'right' : 'left',
                            key: linkData[index].id,
                            payload: linkData[index]
                        }
                        fromLinkSTT.push(item);
                        index++;
                    }
                    this.fromLinkSTTLink = fromLinkSTT;
                }
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public onChange(ret: {}): void {
        if (ret['from'] === 'right') {
            // deleting =-> from table
            this.linkFormSTT({
                action: SERVER_ACTION.UNLINK,
                formLinkStt: ret['list'].map((item: any) => item?.payload?.formLinkStt),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ret['from'] === 'left') {
            // inserting => active | in-active state
            this.linkFormSTT({
                action: SERVER_ACTION.LINK,
                id: this.editPayload.id, // sectionid
                sttId: ret['list'].map((item: any) => item?.key),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    // fetch all lookup
    public linkFormSTT(payload: any): any {
        this.spinnerService.show();
        this.formSettingService.linkFormSTT(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.refresh();
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

}

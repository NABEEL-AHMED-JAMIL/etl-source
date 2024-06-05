import { Component, Input, OnInit } from '@angular/core';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
    SpinnerService
} from 'src/app/_helpers';
import {
    ISTT,
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    FormSettingService
} from 'src/app/_shared';


@Component({
    selector: 'app-stt-link-sttf',
    templateUrl: './stt-link-sttf.component.html',
    styleUrls: ['./stt-link-sttf.component.css']
})
export class SttLinkFormComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: ISTT;

    public sessionUser: AuthResponse;
    // transfer
    public sttLinkFormLink: TransferItem[] = [];

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
        this.fetchAllSTTLinkForm({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public refresh(): void {
        this.fetchAllSTTLinkForm({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllSTTLinkForm(payload: any): any {
        this.spinnerService.show();
        const sttLinkForm: TransferItem[] = [];
        this.formSettingService.fetchAllSTTLinkForm(payload)
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
                            title: linkData[index].formName,
                            description: linkData[index].serviceId,
                            direction: linkData[index].linkStatus ? 'right' : 'left',
                            key: linkData[index].id,
                            payload: linkData[index]
                        }
                        sttLinkForm.push(item);
                        index++;
                    }
                    this.sttLinkFormLink = sttLinkForm;
                }
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public onChange(ret: {}): void {
        if (ret['from'] === 'right') {
            // deleting =-> from table
            this.linkSTTForm({
                action: 5,
                sttLinkForm: ret['list'].map((item: any) => item?.payload?.sttLinkForm),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ret['from'] === 'left') {
            // inserting => active | in-active state
            this.linkSTTForm({
                action: 4,
                id: this.editPayload.id, // sectionid
                formId: ret['list'].map((item: any) => item?.key),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    // fetch all lookup
    public linkSTTForm(payload: any): any {
        this.spinnerService.show();
        this.formSettingService.linkSTTForm(payload)
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

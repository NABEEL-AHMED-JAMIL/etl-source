import { Component, Input, OnInit } from '@angular/core';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService
} from 'src/app/_helpers';
import {
    ISTT,
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    SourceTaskTypeService
} from 'src/app/_shared';

/**
 * @author Nabeel Ahmed
 */
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
    // transfer
    public sessionUser: AuthResponse;
    public sttLinkFormLink: TransferItem[] = [];

    constructor(
        private alertService: AlertService,
        public commomService: CommomService,
        private sourceTaskTypeService: SourceTaskTypeService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.fetchAllSTTLinkForm({
            uuid: this.editPayload.uuid,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public refresh(): void {
        this.fetchAllSTTLinkForm({
            uuid: this.editPayload.uuid,
            sessionUser: {
                username: this.sessionUser.username
            }
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
                uuid: this.editPayload.uuid, // sectionid
                formId: ret['list'].map((item: any) => item?.key),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

     // fetch all lookup
     public fetchAllSTTLinkForm(payload: any): any {
        const sttLinkForm: TransferItem[] = [];
        this.sourceTaskTypeService.fetchAllSTTLinkForm(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
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
                })
            );
    }

    // fetch all lookup
    public linkSTTForm(payload: any): any {
        this.sourceTaskTypeService.linkSTTForm(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.refresh();    
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

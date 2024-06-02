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
    IGenSection,
    ISectionLinkFrom
} from 'src/app/_shared';


@Component({
    selector: 'app-stts-link-sttf',
    templateUrl: './stts-link-sttf.component.html',
    styleUrls: ['./stts-link-sttf.component.css']
})
export class SttsLinkSttfComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenSection;

    public sessionUser: AuthResponse;
    // transfer
    public sectionLinkFromLink: TransferItem[] = [];
    // table
    public searchDetails: any;
    public sectionLinkFromTable: ISectionLinkFrom[] = [];
    public editCache: { [key: string]: { edit: boolean; data: ISectionLinkFrom } } = {};
    public listOfCurrentPageData: readonly any[] = [];

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
        this.fetchAllSectionLinkForm({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public refresh(): void {
        this.fetchAllSectionLinkForm({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllSectionLinkForm(payload: any): any {
        const sectionLinkFrom: TransferItem[] = [];
        const tableData: ISectionLinkFrom[] = [];
        this.spinnerService.show();
        this.formSettingService.fetchAllSectionLinkForm(payload)
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
                            description: linkData[index].formType,
                            direction: linkData[index].linkStatus ? 'right' : 'left',
                            key: linkData[index].id,
                            payload: linkData[index]
                        }
                        sectionLinkFrom.push(item);
                        if (linkData[index]?.sectionOrder != null) {
                            tableData.push(linkData[index]);
                        }
                        index++;
                    }
                    this.sectionLinkFromLink = sectionLinkFrom;
                    this.sectionLinkFromTable = tableData;
                    this.updateEditCache();
                }
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public onChange(ret: {}): void {
        if (ret['from'] === 'right') {
            // deleting =-> from table
            this.linkSectionForm({
                action: 5,
                sectionLinkForm: ret['list'].map((item: any) => item?.payload?.sectionLinkForm),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ret['from'] === 'left') {
            // inserting => active | in-active state
            this.linkSectionForm({
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
    public linkSectionForm(payload: any): any {
        this.spinnerService.show();
        this.formSettingService.linkSectionForm(payload)
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

    //
    public startEdit(id: string): void {
        this.editCache[id].edit = true;
    }

    public cancelEdit(id: string): void {
        const index = this.sectionLinkFromTable
            .findIndex(item => item.id === id);
        this.editCache[id] = {
            data: { ...this.sectionLinkFromTable[index] },
            edit: false
        };
    }

    public saveEdit(id: string): void {
        const index = this.sectionLinkFromTable.findIndex(item => item.id === id);
        console.log(this.editCache[id].data);
        let payload = {
            sectionLinkForm: [this.editCache[id].data.sectionLinkForm],
            sectionOrder: this.editCache[id].data.sectionOrder,
            sessionUser: {
                username: this.sessionUser.username
            }
        };
        this.spinnerService.show();
        this.formSettingService.linkSectionFormOrder(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                Object.assign(this.sectionLinkFromTable[index], this.editCache[id].data);
                this.editCache[id].edit = false;
                this.refresh();
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public updateEditCache(): void {
        this.sectionLinkFromTable.forEach(item => {
            this.editCache[item.id] = {
                edit: false,
                data: { ...item }
            };
        });
    }

    public onCurrentPageDataChange(listOfCurrentPageData: readonly any[]): void {
        this.listOfCurrentPageData = listOfCurrentPageData;
    }

}

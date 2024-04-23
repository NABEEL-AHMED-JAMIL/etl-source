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
    IFormLinkSection,
    IGenFrom
} from 'src/app/_shared';

@Component({
    selector: 'app-sttf-link-stts',
    templateUrl: './sttf-link-stts.component.html',
    styleUrls: ['./sttf-link-stts.component.css']
})
export class SttfLinkSttsComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenFrom;

    public sessionUser: AuthResponse;
    // transfer
    public fromLinkSectionLink: TransferItem[] = [];
    // table
    public searchDetails: any;
    public formLinkSectionTable: IFormLinkSection[] = [];
    public editCache: { [key: string]: { edit: boolean; data: IFormLinkSection } } = {};
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
        this.fetchAllFormLinkSection({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public refresh(): void {
        this.fetchAllFormLinkSection({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllFormLinkSection(payload: any): any {
        const fromLinkSection: TransferItem[] = [];
        const tableData: IFormLinkSection[] = [];
        this.spinnerService.show();
        this.formSettingService.fetchAllFormLinkSection(payload)
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
                            title: linkData[index].sectionName,
                            description: linkData[index].description,
                            direction: linkData[index].linkStatus ? 'right' : 'left',
                            key: linkData[index].id,
                            payload: linkData[index]
                        }
                        fromLinkSection.push(item);
                        if (linkData[index]?.sectionOrder != null) {
                            tableData.push(linkData[index]);
                        }
                        index++;
                    }
                    this.fromLinkSectionLink = fromLinkSection;
                    this.formLinkSectionTable = tableData;
                    this.updateEditCache();
                }
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public onChange(ret: {}): void {
        if (ret['from'] === 'right') {
            // deleting =-> from table
            this.linkFormSection({
                action: 5,
                formLinkSection: ret['list'].map((item: any) => item?.payload?.formLinkSection),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ret['from'] === 'left') {
            // inserting => active | in-active state
            this.linkFormSection({
                action: 4,
                id: this.editPayload.id, // sectionid
                sectionId: ret['list'].map((item: any) => item?.key),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    // fetch all lookup
    public linkFormSection(payload: any): any {
        this.spinnerService.show();
        this.formSettingService.linkFormSection(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.refresh();
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    //
    public startEdit(id: string): void {
        this.editCache[id].edit = true;
    }

    public cancelEdit(id: string): void {
        const index = this.formLinkSectionTable
            .findIndex(item => item.id === id);
        this.editCache[id] = {
            data: { ...this.formLinkSectionTable[index] },
            edit: false
        };
    }

    public saveEdit(id: string): void {
        const index = this.formLinkSectionTable.findIndex(item => item.id === id);
        let payload = {
            formLinkSection: [this.editCache[id].data.formLinkSection],
            sectionOrder: this.editCache[id].data.sectionOrder,
            sessionUser: {
                username: this.sessionUser.username
            }
        };
        this.spinnerService.show();
        this.formSettingService.linkFormSectionOrder(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                Object.assign(this.formLinkSectionTable[index], this.editCache[id].data);
                this.editCache[id].edit = false;
                this.refresh();
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public updateEditCache(): void {
        this.formLinkSectionTable.forEach(item => {
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

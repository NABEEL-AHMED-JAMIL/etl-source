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
    ISectionLinkControl
} from 'src/app/_shared';


@Component({
    selector: 'app-stts-link-sttc',
    templateUrl: './stts-link-sttc.component.html',
    styleUrls: ['./stts-link-sttc.component.css']
})
export class SttsLinkSttcComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenSection;

    public sessionUser: AuthResponse;
    // transfer
    public sectionLinkControlLink: TransferItem[] = [];
    // table
    public searchDetails: any;
    public sectionLinkControlTable: ISectionLinkControl[] = [];
    public editCache: { [key: string]: { edit: boolean; data: ISectionLinkControl } } = {};
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
        this.fetchAllSectionLinkControl({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public refresh(): void {
        this.fetchAllSectionLinkControl({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllSectionLinkControl(payload: any): any {
        const sectionLinkControl: TransferItem[] = [];
        const tableData: ISectionLinkControl[] = [];
        this.spinnerService.show();
        this.formSettingService.fetchAllSectionLinkControl(payload)
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
                            title: linkData[index].controlName,
                            description: linkData[index].fieldType,
                            direction: linkData[index].linkedSection ? 'right' : 'left',
                            key: linkData[index].id,
                            payload: linkData[index]
                        }
                        sectionLinkControl.push(item);
                        if (linkData[index]?.controlOrder != null) {
                            tableData.push(linkData[index]);
                        }
                        index++;
                    }
                    this.sectionLinkControlLink = sectionLinkControl;
                    this.sectionLinkControlTable = tableData;
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
            this.linkSectionControl({
                action: 5,
                sectionLinkControl: ret['list']
                    .map((item: any) => item?.payload?.linkControlId),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ret['from'] === 'left') {
            // inserting => active | in-active state
            this.linkSectionControl({
                action: 4,
                id: this.editPayload.id, // sectionid
                controlId: ret['list'].map((item: any) => item?.key),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    // fetch all lookup
    public linkSectionControl(payload: any): any {
        this.spinnerService.show();
        this.formSettingService.linkSectionControl(payload)
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
        const index = this.sectionLinkControlTable
            .findIndex(item => item.id === id);
        this.editCache[id] = {
            data: { ...this.sectionLinkControlTable[index] },
            edit: false
        };
    }

    public saveEdit(id: string): void {
        const index = this.sectionLinkControlTable.findIndex(item => item.id === id);
        let payload = {
            sectionLinkControl: [this.editCache[id].data.linkControlId],
            controlOrder: this.editCache[id].data.controlOrder,
            disabledPattern: this.editCache[id].data.disabledPattern,
            visiblePattern: this.editCache[id].data.visiblePattern,
            sessionUser: {
                username: this.sessionUser.username
            }
        };
        this.spinnerService.show();
        this.formSettingService.linkSectionControlOrder(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                Object.assign(this.sectionLinkControlTable[index], this.editCache[id].data);
                this.editCache[id].edit = false;
                this.refresh();
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public updateEditCache(): void {
        this.sectionLinkControlTable.forEach(item => {
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

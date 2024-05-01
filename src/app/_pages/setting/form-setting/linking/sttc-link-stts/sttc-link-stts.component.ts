import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TransferItem } from 'ng-zorro-antd/transfer';
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
    IControlLinkSection,
    IGenControl
} from 'src/app/_shared';
import { first } from 'rxjs';


@Component({
    selector: 'app-sttc-link-stts',
    templateUrl: './sttc-link-stts.component.html',
    styleUrls: ['./sttc-link-stts.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SttcLinkSttsComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenControl;

    public sessionUser: AuthResponse;
    // transfer
    public controlLinkSectionLink: TransferItem[] = [];
    // table
    public searchDetails: any;
    public controlLinkSectionTable: IControlLinkSection[] = [];
    public editCache: { [key: string]: { edit: boolean; data: IControlLinkSection } } = {};
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
        this.fetchAllControlLinkSection({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public refresh(): void {
        this.fetchAllControlLinkSection({
            id: this.editPayload.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // fetch all lookup
    public fetchAllControlLinkSection(payload: any): any {
        const controlLinkSection: TransferItem[] = [];
        const tableData: IControlLinkSection[] = [];
        this.spinnerService.show();
        this.formSettingService.fetchAllControlLinkSection(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                if (response.data) {
                    let linkData = response.data;
                    let index = 0;
                    while (index < linkData.length) {
                        let item: TransferItem = {
                            title: linkData[index].sectionName,
                            description: linkData[index].description,
                            direction: linkData[index].linkedControl ? 'right' : 'left',
                            key: linkData[index].id,
                            payload: linkData[index]
                        }
                        controlLinkSection.push(item);
                        if (linkData[index]?.controlOrder != null) {
                            tableData.push(linkData[index]);
                        }
                        index++;
                    }
                    this.controlLinkSectionLink = controlLinkSection;
                    this.controlLinkSectionTable = tableData;
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
            this.linkControlSection({
                action: 5,
                controlLinkSection: ret['list']
                    .map((item: any) => item?.payload?.linkSectionId),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        } else if (ret['from'] === 'left') {
            // inserting => active | in-active state
            this.linkControlSection({
                action: 4,
                id: this.editPayload.id, // controlId
                sectionId: ret['list'].map((item: any) => item?.key),
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    // fetch all lookup
    public linkControlSection(payload: any): any {
        this.spinnerService.show();
        this.formSettingService.linkControlSection(payload)
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
        const index = this.controlLinkSectionTable.findIndex(item => item.id === id);
        this.editCache[id] = {
            data: { ...this.controlLinkSectionTable[index] },
            edit: false
        };
    }

    public saveEdit(id: string): void {
        const index = this.controlLinkSectionTable.findIndex(item => item.id === id);
        let payload = {
            controlLinkSection: [this.editCache[id].data.linkSectionId],
            controlOrder: this.editCache[id].data.controlOrder,
            disabledPattern: this.editCache[id].data.disabledPattern,
            visiblePattern: this.editCache[id].data.visiblePattern,
            sessionUser: {
                username: this.sessionUser.username
            }
        };
        this.spinnerService.show();
        this.formSettingService.linkControlSectionOrder(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                Object.assign(this.controlLinkSectionTable[index], this.editCache[id].data);
                this.editCache[id].edit = false;
                this.refresh();
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error.message, ApiCode.ERROR);
            });
    }

    public updateEditCache(): void {
        this.controlLinkSectionTable
        .forEach(item => {
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

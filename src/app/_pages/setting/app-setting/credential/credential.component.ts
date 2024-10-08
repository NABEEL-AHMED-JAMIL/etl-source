import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService
} from 'src/app/_helpers';
import { CuCredentialComponent } from 'src/app/_pages';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    CredentailService,
    IStaticTable
} from 'src/app/_shared';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-credential',
    templateUrl: 'credential.component.html',
    styleUrls: ['credential.component.css']
})
export class CredentialComponent implements OnInit {

    public sessionUser: AuthResponse;
    public setOfCheckedId = new Set<any>();
    public credentialTable = this.initStaticTable();

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private commomService: CommomService,
        private credentailService: CredentailService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
    }


    ngOnInit() {
        this.fetchAllCredential({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    private initStaticTable(): IStaticTable {
        return {
            tableId: 'credential_id',
            title: 'Mg Credential',
            bordered: true,
            checkbox: true,
            size: 'small',
            headerButton: [
                {
                    type: 'plus-circle',
                    color: 'red',
                    spin: false,
                    tooltipTitle: 'Add',
                    action: ActionType.ADD
                },
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
                    field: 'name',
                    header: 'Name',
                    type: 'data'
                },
                {
                    field: 'description',
                    header: 'Description',
                    type: 'data'
                },
                {
                    field: 'type',
                    header: 'Type',
                    type: 'tag',
                    showImg: true
                },
                {
                    field: 'totalCount',
                    header: 'Link To Event',
                    type: 'tag'
                },
                {
                    field: 'dateCreated',
                    header: 'Created',
                    type: 'date'
                },
                {
                    field: 'createdBy',
                    header: 'Created By',
                    type: 'combine',
                    subfield: ['username']
                },
                {
                    field: 'dateUpdated',
                    header: 'Updated',
                    type: 'date'
                },
                {
                    field: 'updatedBy',
                    header: 'Updated By',
                    type: 'combine',
                    subfield: ['username']
                },
                {
                    field: 'status',
                    header: 'Status',
                    type: 'tag'
                }
            ],
            extraHeaderButton: [
                {
                    title: 'Delete All',
                    type: 'delete',
                    action: ActionType.DELETE
                }
            ],
            actionType: [
                {
                    type: 'form',
                    color: 'green',
                    spin: false,
                    tooltipTitle: 'Edit',
                    action: ActionType.EDIT
                },
                {
                    type: 'download',
                    color: '#11315f',
                    spin: false,
                    tooltipTitle: 'Download',
                    action: ActionType.DOWNLOAD
                },
                {
                    type: 'delete',
                    color: 'red',
                    spin: false,
                    tooltipTitle: 'Delete',
                    action: ActionType.DELETE
                }
            ]
        };
    }

    public tableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuLookup(ActionType.EDIT, payload);
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteCredential({
                        id: payload.data.id,
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                }
            });
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to download?',
                nzContent: 'Press \'Ok\' file will download.',
                nzOnOk: () => {
                    this.fetchCredentialById(payload.data);
                }
            });
        }
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuLookup(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllCredential({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    public extraActionReciver(payload: any): void {
        if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteAllCredential(
                        {
                            ids: payload.checked
                        });
                }
            });
        }
    }

    public openCuLookup(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'default',
            nzTitle: actionType === ActionType.ADD ? 'Add Credential' : 'Edit Credential',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CuCredentialComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            this.fetchAllCredential({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        });
    }

    // fetch all lookup
    public fetchAllCredential(payload: any): any {
        this.credentailService.fetchAllCredential(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.credentialTable.dataSource = response.data;
                }
            ));
    }

    public fetchCredentialById(data: any): void {
        let payload = {
            id: data.id,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.credentailService.fetchCredentialById(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.commomService.createFile(response.data);
                }
            ));
    }

    public deleteCredential(payload: any): void {
        this.credentailService.deleteCredential(payload).pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.fetchAllCredential({
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                }
            ));
    }

    public deleteAllCredential(payload: any): void {
        this.credentailService.deleteAllCredential(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchAllCredential({
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                    this.setOfCheckedId = new Set<any>();
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                }
            ));
    }

    private handleApiResponse(response: any, successCallback: Function): void {
        if (response.status === ApiCode.ERROR) {
            this.alertService.showError(response.message, ApiCode.ERROR);
            return;
        }
        successCallback();
    }

}
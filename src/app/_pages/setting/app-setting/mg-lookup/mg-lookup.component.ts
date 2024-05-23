import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';
import { Location } from '@angular/common';
import {
    BatchComponent,
    CULookupComponent
} from '../../../index';
import {
    ApiCode,
    IStaticTable,
    ActionType,
    ILookupData,
    LookupService,
    AuthResponse,
    AuthenticationService
} from '../../../../_shared';
import {
    AlertService,
    SpinnerService,
    CommomService
} from '../../../../_helpers';


@Component({
    selector: 'app-mg-lookup',
    templateUrl: './mg-lookup.component.html',
    styleUrls: ['./mg-lookup.component.css']
})
export class MGLookupComponent implements OnInit {

    public isParent: boolean = false;
    public lookupId: any;
    public lookupAction: ActionType;
    public parentLookupDate: ILookupData;
    public sessionUser: AuthResponse;
    public lookupTable: IStaticTable = {
        tableId: 'lookup_id',
        title: 'Mg Lookup',
        bordered: true,
        checkbox: false,
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
            },
            {
                type: 'upload',
                color: 'balck',
                spin: false,
                tooltipTitle: 'Upload',
                action: ActionType.UPLOAD
            },
            {
                type: 'download',
                color: 'balck',
                spin: false,
                tooltipTitle: 'Download',
                action: ActionType.DOWNLOAD
            }
        ],
        dataColumn: [
            {
                field: 'lookupType',
                header: 'Lookup Type',
                type: 'data'
            },
            {
                field: 'lookupCode',
                header: 'Code',
                type: 'data'
            },
            {
                field: 'lookupValue',
                header: 'Lookup Value',
                type: 'data'
            },
            {
                field: 'description',
                header: 'Description',
                type: 'data'
            },
            {
                field: 'uiLookup',
                header: 'UI Lookup',
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
        ]
    };

    constructor(private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private modalService: NzModalService,
        private drawerService: NzDrawerService,
        private lookupService: LookupService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private commomService: CommomService,
        private authenticationService: AuthenticationService) {
            this.authenticationService.currentUser
                .subscribe(currentUser => {
                    this.sessionUser = currentUser;
                });
            this.route.data
                .subscribe((data: any) => {
                    this.isParent = data.parent;
                    if (!this.isParent) {
                        this.route.queryParams.subscribe(params => {
                            this.lookupId = params['lookupId'];
                            this.fetchSubLookupDataByParentLookupDataId({
                                sessionUser: {
                                    username: this.sessionUser.username
                                },
                                parentLookupId: this.lookupId
                            });
                        });
                    }
                });
    }

    ngOnInit(): void {
        if (this.isParent) {
            this.findAllParentLookupByUsername({
                sessionUser: {
                    username: this.sessionUser.username
                }
            });
        }
    }

    // fetch all lookup
    public findAllParentLookupByUsername(payload: any): any {
        this.spinnerService.show();
        this.lookupService.findAllParentLookupByUsername(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.lookupTable.dataSource = response.data;
                this.lookupTable.actionType = [
                    {
                        type: 'form',
                        color: 'green',
                        spin: false,
                        tooltipTitle: 'Edit',
                        action: ActionType.EDIT
                    },
                    {
                        type: 'plus-square',
                        color: 'blue',
                        spin: false,
                        tooltipTitle: 'Sub Lookup',
                        action: ActionType.SUBNODE
                    }
                ];
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public fetchSubLookupDataByParentLookupDataId(payload: any): void {
        this.spinnerService.show();
        this.lookupService.fetchSubLookupDataByParentLookupDataId(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response?.message, ApiCode.ERROR);
                    return;
                }
                // parent lookup date to show the parent detail
                this.parentLookupDate = response?.data.PARENT_LOOKUP_DATA;
                this.parentLookupDate.lookupChildren = response?.data.SUB_LOOKUP_DATA;
                this.lookupTable.dataSource = this.parentLookupDate.lookupChildren;
                this.lookupTable.actionType = [
                    {
                        type: 'form',
                        color: 'green',
                        spin: false,
                        tooltipTitle: 'Edit',
                        action: ActionType.EDIT
                    },
                    {
                        type: 'delete',
                        color: 'red',
                        spin: false,
                        tooltipTitle: 'Delete',
                        action: ActionType.DELETE
                    }
                ];
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public downloadLookupData(payload: any): void {
        this.spinnerService.show();
        this.lookupService.downloadLookupData(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.commomService.downLoadFile(response);
                this.spinnerService.hide();
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public deleteLookupData(payload: any): void {
        this.spinnerService.show();
        this.lookupService.deleteLookupData(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.fetchSubLookupDataByParentLookupDataId({
                    sessionUser: {
                        username: this.sessionUser.username
                    },
                    parentLookupId: this.lookupId
                });
                this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuLookup(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            if (this.isParent) {
                this.findAllParentLookupByUsername({
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
            } else {
                this.fetchSubLookupDataByParentLookupDataId({
                    sessionUser: {
                        username: this.sessionUser.username
                    },
                    parentLookupId: this.lookupId
                });
            }
            // after delete reset the data
        } else if (ActionType.DOWNLOAD === payload.action) {
            if (this.isParent) {
                this.downloadLookupData({
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                }
                );
            } else {
                this.downloadLookupData({
                    sessionUser: {
                        username: this.sessionUser.username
                    },
                    parentLookupId: this.lookupId
                });
            }
        } else if (ActionType.UPLOAD === payload.action) {
            if (this.isParent) {
                payload.action = 'Lookup'
            } else {
                payload.action = 'SubLookup',
                    payload.data = {
                        parentLookupId: this.lookupId
                    }
            }
            this.openBatchTemplate(payload);
        }
    }

    public tableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            this.openCuLookup(ActionType.EDIT, payload);
        } else if (ActionType.SUBNODE === payload.action) {
            // sub node only in parent side setting so no need to check
            this.router.navigate(['/setting/mgLookup/mgSubLookup'],
                {
                    queryParams: {
                        lookupId: payload.data.id
                    }
                });
        } else if (ActionType.DELETE === payload.action) {
            const drawerRef = this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    this.deleteLookupData({ id: payload.data.id });
                }
            });
            drawerRef.afterClose.subscribe(data => {
                if (this.isParent) {
                    this.findAllParentLookupByUsername({
                        sessionUser: {
                            username: this.sessionUser.username
                        }
                    });
                } else {
                    this.fetchSubLookupDataByParentLookupDataId({
                        sessionUser: {
                            username: this.sessionUser.username
                        },
                        parentLookupId: this.lookupId
                    });
                }
            });
        }
    }

    public openBatchTemplate(payload: any): void {
        const drawerRef = this.drawerService.create({
            nzTitle: 'Batch Operation',
            nzSize: 'default',
            nzMaskClosable: false,
            nzFooter: 'Note :- Add Xlsx File For Process, Once File Upload Successfully Click the Refresh Button',
            nzContent: BatchComponent,
            nzContentParams: {
                batchDetail: payload
            }
        });
        drawerRef.afterClose.subscribe(data => {
            if (this.isParent) {
                this.findAllParentLookupByUsername({
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
            } else {
                this.fetchSubLookupDataByParentLookupDataId({
                    sessionUser: {
                        username: this.sessionUser.username
                    },
                    parentLookupId: this.lookupId
                });
            }
        });
    }

    public openCuLookup(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzTitle: actionType === ActionType.ADD ? 'Add Lookup' : 'Edit Lookup',
            nzSize: 'default',
            nzMaskClosable: false,
            nzContent: CULookupComponent,
            nzContentParams: {
                actionType: actionType,
                parentLookupId: this.lookupId,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose.subscribe(data => {
            if (this.isParent) {
                this.findAllParentLookupByUsername({
                    sessionUser: {
                        username: this.sessionUser.username
                    }
                });
            } else {
                this.fetchSubLookupDataByParentLookupDataId({
                    sessionUser: {
                        username: this.sessionUser.username
                    },
                    parentLookupId: this.lookupId
                });
            }
        });
    }

    public onBack(): void {
        this.location.back();
    }

}

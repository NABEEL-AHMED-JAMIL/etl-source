import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
} from 'src/app/_helpers';
import {
    BatchComponent,
    CUEvariableComponent,
    EVUCroseTableComponent
} from 'src/app/_pages';
import {
    ApiCode,
    IStaticTable,
    ActionType,
    EVariableService,
    IEnVariables
} from 'src/app/_shared';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-mg-evariable',
    templateUrl: './mg-evariable.component.html',
    styleUrls: ['./mg-evariable.component.css']
})
export class MgEVariableComponent implements OnInit {

    // evaraible
    public setOfCheckedId = new Set<any>();
    public eVariableTable = this.initStaticTable();

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private commomService: CommomService,
        private eVariableService: EVariableService) {
    }

    ngOnInit(): void {
        this.fetchAllEnVariable({});
    }

    private initStaticTable(): IStaticTable {
        return {
            tableId: 'variable_id',
            title: 'Mg E-Variable',
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
            extraHeaderButton: [
                {
                    title: 'Delete All',
                    type: 'delete',
                    action: ActionType.DELETE
                }
            ],
            dataColumn: [
                {
                    field: 'envKey',
                    header: 'Env Key',
                    type: 'data'
                },
                {
                    field: 'description',
                    header: 'Description',
                    type: 'data'
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
            actionType: [
                {
                    type: 'form',
                    color: 'green',
                    spin: false,
                    tooltipTitle: 'Edit',
                    action: ActionType.EDIT
                },
                {
                    type: 'link',
                    color: 'orange',
                    spin: false,
                    tooltipTitle: 'Link With User',
                    action: ActionType.LINK
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
            this.openCuEnVariable(ActionType.EDIT, payload);
        } else if (ActionType.LINK === payload.action) {
            this.drawerService.create({
                nzTitle: payload.data.envKey,
                nzWidth: 900,
                nzContent: EVUCroseTableComponent,
                nzContentParams: {
                    enVariable: payload.data
                },
                nzFooter: null, // Optional footer
            });
        } else if (ActionType.DELETE === payload.action) {
            this.modalService.confirm({
                nzOkText: 'Ok',
                nzCancelText: 'Cancel',
                nzTitle: 'Do you want to delete?',
                nzContent: 'Press \'Ok\' may effect the business source.',
                nzOnOk: () => {
                    let enVariable: IEnVariables = {
                        uuid: payload.data.uuid,
                        envKey: payload.data.envKey,
                        description: payload.data.description
                    }
                    this.deleteEnVariableById({
                        ...enVariable
                    });
                }
            });
        } 
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuEnVariable(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchAllEnVariable({});
        } else if (ActionType.DOWNLOAD === payload.action) {
            this.eVariableService.downloadEnVariable({
                uuids: payload.checked
            }).pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.commomService.downLoadFile(response);
                })
            );
        } else if (ActionType.UPLOAD === payload.action) {
            payload.action = 'EVariable';
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
            drawerRef.afterClose
            .subscribe(data => {
                this.fetchAllEnVariable({});
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
                    this.deleteAllEnVariable(
                        {
                            uuids: payload.checked
                        });
                }
            });
        }
    }

    public openCuEnVariable(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'default',
            nzTitle: actionType === ActionType.ADD ? 'Add EVariable' : 'Edit EVariable',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUEvariableComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose
        .subscribe(data => {
            this.fetchAllEnVariable({});
        });
    }

    public fetchAllEnVariable(payload: any): any {
        this.eVariableService.fetchAllEnVariable(payload).pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.eVariableTable.dataSource = response.data;
                }
            ));
    }

    public deleteEnVariableById(payload: any): void {
        this.eVariableService.deleteEnVariableById(payload).pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.fetchAllEnVariable({});
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                }
            ));
    }

    public deleteAllEnVariable(payload: any): void {
        this.eVariableService.deleteAllEnVariable(payload).pipe(first())
            .subscribe((response: any) =>
                this.handleApiResponse(response, () => {
                    this.fetchAllEnVariable({});
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

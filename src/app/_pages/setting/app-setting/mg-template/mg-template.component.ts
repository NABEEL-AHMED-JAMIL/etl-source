import { Component, OnInit } from '@angular/core';
import {
    ApiCode,
    IStaticTable,
    ActionType,
    TemplateRegService,
    AuthResponse,
    AuthenticationService
} from '../../../../_shared';
import {
    AlertService,
    CommomService,
} from '../../../../_helpers';
import { CUTemplateComponent } from '../../../index';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { first } from 'rxjs';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-mg-template',
    templateUrl: './mg-template.component.html',
    styleUrls: ['./mg-template.component.css']
})
export class MgTemplateComponent implements OnInit {

    public sessionUser: AuthResponse;
    public setOfCheckedId = new Set<any>();
    public templateTable: IStaticTable = this.initStaticTable();

    constructor(
        private drawerService: NzDrawerService,
        private modalService: NzModalService,
        private alertService: AlertService,
        private commomService: CommomService,
        private templateRegService: TemplateRegService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.fetchTemplateReg({});
    }

    private initStaticTable(): IStaticTable {
        return {
            tableUuid: this.commomService.uuid(),
            title: 'Mg Template',
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
            extraHeaderButton: [
                {
                    title: 'Delete All',
                    type: 'delete',
                    action: ActionType.DELETE
                }
            ],
            dataColumn: [
                {
                    field: 'templateName',
                    header: 'Template Name',
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
                    type: 'delete',
                    color: 'red',
                    spin: false,
                    tooltipTitle: 'Delete',
                    action: ActionType.DELETE
                }
            ]
        };
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.ADD === payload.action) {
            this.openCuLookup(ActionType.ADD, null);
        } else if (ActionType.RE_FRESH === payload.action) {
            this.fetchTemplateReg({});
        }
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
                    this.deleteTemplateReg({
                        uuid: payload.data.uuid
                    });
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
                    this.deleteAllTemplateReg({
                        uuids: payload.checked
                    });
                }
            });
        }
    }

    public openCuLookup(actionType: ActionType, editPayload: any): void {
        const drawerRef = this.drawerService.create({
            nzSize: 'default',
            nzTitle: actionType === ActionType.ADD ? 'Add Template' : 'Edit Template',
            nzPlacement: 'right',
            nzMaskClosable: false,
            nzContent: CUTemplateComponent,
            nzContentParams: {
                actionType: actionType,
                editPayload: editPayload?.data
            }
        });
        drawerRef.afterClose
        .subscribe(data => {
            this.fetchTemplateReg({});
        });
    }

    public fetchTemplateReg(payload: any): any {
        this.templateRegService.fetchTemplateReg(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.templateTable.dataSource = response.data;
                })
            );
    }
    
    public deleteTemplateReg(payload: any): void {
        this.templateRegService.deleteTemplateReg(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchTemplateReg({});
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
                })
            );
    }

    public deleteAllTemplateReg(payload: any): void {
        this.templateRegService.deleteAllTemplateReg(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.fetchTemplateReg({});
                    this.setOfCheckedId = new Set<any>();
                    this.alertService.showSuccess(response.message, ApiCode.SUCCESS);
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

import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import {
    AlertService,
    CommomService,
} from 'src/app/_helpers';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    EVariableService,
    IEnVariables,
    IStaticTable
} from 'src/app/_shared';
import { EnvVariableValueComponent } from 'src/app/_pages';
import { NzModalService } from 'ng-zorro-antd/modal';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-evu-crose-table',
    templateUrl: './evu-crose-table.component.html',
    styleUrls: ['./evu-crose-table.component.css']
})
export class EVUCroseTableComponent implements OnInit {

    @Input()
    public enVariable: IEnVariables;

    public startDate: any;
    public endDate: any;
    public searchDetails: any;
    public sessionUser: AuthResponse;
    public envLinkUserTable = this.initStaticTable();

    constructor(
        private alertService: AlertService,
        private modalService: NzModalService,
        private commomService: CommomService,
        private eVariableService: EVariableService,
        private authenticationService: AuthenticationService) {
        this.endDate = this.commomService.getCurrentDate();
        this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.fetchLinkEVariableWitUser({
            startDate: this.startDate,
            endDate: this.endDate,
            envId: this.enVariable.id
        });
    }

    private initStaticTable(): IStaticTable {
        return {
            tableId: 'profile_link_user_id',
            title: 'Profile Link User',
            bordered: true,
            checkbox: false,
            enableAction: true,
            size: 'small',
            headerButton: [
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
                    field: 'fullName',
                    header: 'Name',
                    type: 'data'
                },
                {
                    field: 'email',
                    header: 'Email',
                    type: 'data'
                },
                {
                    field: 'username',
                    header: 'Username',
                    type: 'data'
                },
                {
                    field: 'profile',
                    header: 'Profile',
                    type: 'combine',
                    subfield: ['description']
                },
                {
                    field: 'envValue',
                    header: 'Env Value',
                    type: 'data',
                },
                {
                    field: 'linkStatus',
                    header: 'Link Status',
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
                }
            ]
        };
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.RE_FRESH === payload.action) {
            this.fetchLinkEVariableWitUser({
                startDate: this.startDate,
                endDate: this.endDate,
                envId: this.enVariable.id
            });
        }
    }

    public enableActionReciver(payload: any): void {
        this.eVariableService.linkEVariableWithUser({
            envId: this.enVariable.id,
            appUserId: payload.id,
            linked: payload.linked
        }).pipe(first()).subscribe((response: any) => 
            this.handleApiResponse(response, () => {
                if (!payload?.linked) {
                    payload.envValue = '';
                } else {
                    payload.envValue = '';
                    payload.linkId = response.data.linkId;
                }
            }
        ));
    }

    public tableActionReciver(payload: any): void {
        if (ActionType.EDIT === payload.action) {
            if (!payload?.data?.linked) {
                this.alertService.showError('Please link user then edit.', ApiCode.ERROR);                
                return;
            }
            let editPayload: IEnVariables = {
                id: payload?.data.linkId,
                envKey: this.enVariable.envKey,
                envValue: payload?.data.envValue
            }
            const drawerRef = this.modalService.create({
                nzTitle: 'Environment Variable',
                nzMaskClosable: false,
                nzContent: EnvVariableValueComponent,
                nzComponentParams: {
                    actionType: payload.action,
                    editPayload: editPayload
                },
                nzFooter: '' // Set the footer to null to hide it
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchLinkEVariableWitUser({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    envId: this.enVariable.id
                });
            });  
        }
    }

    public filterActionReciver(payload: any): void {
        this.startDate = payload.startDate;
        this.endDate = payload.endDate;
        this.fetchLinkEVariableWitUser({
            startDate: this.startDate,
            endDate: this.endDate,
            envId: this.enVariable.id
        });
    }

    public fetchLinkEVariableWitUser(payload: any): any {
        this.eVariableService.fetchLinkEVariableWitUser(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.envLinkUserTable.dataSource = response.data;
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

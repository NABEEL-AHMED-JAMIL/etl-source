import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService
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


@Component({
    selector: 'app-evu-crose-table',
    templateUrl: './evu-crose-table.component.html',
    styleUrls: ['./evu-crose-table.component.css']
})
export class EVUCroseTableComponent implements OnInit {

    public searchDetails: any;
    public sessionUser: AuthResponse;

    @Input()
    public enVariable: IEnVariables;
    // profile
    public envLinkUserTable: IStaticTable = {
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
                type: 'edit',
                color: 'green',
                spin: false,
                tooltipTitle: 'Edit',
                action: ActionType.EDIT
            }
        ]
    };

    constructor(
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private modalService: NzModalService,
        private eVariableService: EVariableService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchLinkEVariableWitUser({
            envId: this.enVariable.id
        });
    }

    public fetchLinkEVariableWitUser(payload: any): any {
        this.spinnerService.show();
        this.eVariableService.fetchLinkEVariableWitUser(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.envLinkUserTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);;
            });
    }

    public buttonActionReciver(payload: any): void {
        if (ActionType.RE_FRESH === payload.action) {
            this.fetchLinkEVariableWitUser({
                envId: this.enVariable.id
            });
        }
    }

    public enableActionReciver(payload: any): void {
        this.spinnerService.show();
        this.eVariableService.linkEVariableWithUser({
            envId: this.enVariable.id,
            appUserId: payload.id,
            linked: payload.linked
        }).pipe(first())
        .subscribe((response: any) => {
            this.spinnerService.hide();
            if (response.status === ApiCode.ERROR) {
                this.alertService.showError(response.message, ApiCode.ERROR);
                return;
            }
        }, (response: any) => {
            this.spinnerService.hide();
            this.alertService.showError(response.error.message, ApiCode.ERROR);;
        });
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
                nzFooter: null // Set the footer to null to hide it
            });
            drawerRef.afterClose.subscribe(data => {
                this.fetchLinkEVariableWitUser({
                    envId: this.enVariable.id
                });
            });  
        }
    }


}

import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import {
    ApiCode,
    AuthResponse,
    AuthenticationService,
    EVariableService,
    IEnVariables,
    IStaticTable
} from 'src/app/_shared';


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
                subfield: ['id', 'profileName']
            },
            {
                field: 'envValue',
                header: 'Env Value',
                type: 'data',
            },
            {
                field: 'linkStatus',
                header: 'Status',
                type: 'tag'
            }
        ]
    };

    constructor(
        private alertService: AlertService,
        private spinnerService: SpinnerService,
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

    public enableActionReciver(payload: any): void {
        this.spinnerService.show();
        this.eVariableService.linkEVariableWithUser({
            envId: this.enVariable.id,
            appUserId: payload.id,
            linked: payload.linked
        })
            .pipe(first())
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


}

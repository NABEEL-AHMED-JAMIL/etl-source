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
        bordered: false,
        checkbox: false,
        enableAction: true,
        size: 'small',
        dataColumn: [
            {
                field: 'profileImg',
                header: 'Image',
                type: 'img'
            },
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
                field: 'profile',
                header: 'Profile',
                type: 'combine',
                subfield: ['id', 'profileName']
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
        this.fetchLinkEVariableWithRootUser({
            envId: this.enVariable.id
        });
    }

    public fetchLinkEVariableWithRootUser(payload: any): any {
        this.spinnerService.show();
        this.eVariableService.fetchLinkEVariableWithRootUser(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.envLinkUserTable.dataSource = response.data;
            }, (error: any) => {
                this.spinnerService.hide();
                this.alertService.showError(error, ApiCode.ERROR);
            });
    }

    public enableActionReciver(payload: any): void {
        this.spinnerService.show();
        this.eVariableService.linkEVariableWithRootUser({
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
        }, (error: any) => {
            this.spinnerService.hide();
            this.alertService.showError(error, ApiCode.ERROR);
        });
    }


}

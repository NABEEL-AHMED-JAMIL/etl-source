import { Component, Input, OnInit } from '@angular/core';
import {
    ApiCode,
    AuthResponse,
    AuthenticationService,
    IRole,
    IStaticTable,
    RPPService,
} from '../../../../_shared';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import { first } from 'rxjs';


@Component({
    selector: 'app-ru-crose-table',
    templateUrl: './ru-crose-table.component.html',
    styleUrls: ['./ru-crose-table.component.css']
})
export class RUCroseTableComponent implements OnInit {

    public searchDetails: any;
    public sessionUser: AuthResponse;

    @Input()
    public role: IRole;
    // profile
    public roleLinkUserTable: IStaticTable = {
        tableId: 'role_link_user_id',
        title: 'Role Link User',
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
                subfield: ['profileName']
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
        private rppService: RPPService,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
            });
    }

    ngOnInit(): void {
        this.fetchLinkRoleWithUser({
            roleId: this.role.id
        });
    }

    // role -> root user
    public fetchLinkRoleWithUser(payload: any): any {
        this.spinnerService.show();
        this.rppService.fetchLinkRoleWithUser(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.roleLinkUserTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public enableActionReciver(payload: any): void {
        this.spinnerService.show();
        this.rppService.linkRoleWithUser({
            roleId: this.role.id,
            appUserId: payload.id,
            linked: payload.linked,
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
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }


}

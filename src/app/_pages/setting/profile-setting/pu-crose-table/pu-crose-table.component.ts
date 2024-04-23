import { Component, Input, OnInit } from '@angular/core';
import {
    ApiCode,
    AuthResponse,
    AuthenticationService,
    IProfile,
    IStaticTable,
    RPPService,
} from '../../../../_shared';
import {
    AlertService,
    SpinnerService
} from 'src/app/_helpers';
import { first } from 'rxjs';


@Component({
    selector: 'app-pu-crose-table',
    templateUrl: './pu-crose-table.component.html',
    styleUrls: ['./pu-crose-table.component.css']
})
export class PUCroseTableComponent implements OnInit {

    public searchDetails: any;
    public sessionUser: AuthResponse;

    @Input()
    public profile: IProfile;
    // profile
    public profileLinkUserTable: IStaticTable = {
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
        this.fetchLinkProfileWithRootUser({
            profileId: this.profile.id
        });
    }

    // profile&permission
    public fetchLinkProfileWithRootUser(payload: any): any {
        this.spinnerService.show();
        this.rppService.fetchLinkProfileWithRootUser(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.profileLinkUserTable.dataSource = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public enableActionReciver(payload: any): void {
        this.spinnerService.show();
        this.rppService.linkProfileWithRootUser({
            profileId: this.profile.id,
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

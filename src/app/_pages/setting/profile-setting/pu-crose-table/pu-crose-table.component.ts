import { Component, Input, OnInit } from '@angular/core';
import {
    ActionType,
    ApiCode,
    AuthResponse,
    AuthenticationService,
    IProfile,
    IStaticTable,
    RPPService,
} from '../../../../_shared';
import {
    AlertService,
    CommomService,
    SpinnerService
} from 'src/app/_helpers';
import { first } from 'rxjs';


@Component({
    selector: 'app-pu-crose-table',
    templateUrl: './pu-crose-table.component.html',
    styleUrls: ['./pu-crose-table.component.css']
})
export class PUCroseTableComponent implements OnInit {

    public startDate: any;
    public endDate: any;
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
        private rppService: RPPService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private commomService: CommomService,
        private authenticationService: AuthenticationService) {
            this.endDate = this.commomService.getCurrentDate();
            this.startDate = this.commomService.getDate29DaysAgo(this.endDate);
            this.authenticationService.currentUser
                .subscribe(currentUser => {
                    this.sessionUser = currentUser;
                });
    }

    ngOnInit(): void {
        this.fetchLinkProfileWithUser({
            startDate: this.startDate,
            endDate: this.endDate,
            profileId: this.profile.id
        });
    }

    // profile&permission
    public fetchLinkProfileWithUser(payload: any): any {
        this.spinnerService.show();
        this.rppService.fetchLinkProfileWithUser(payload)
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

    public buttonActionReciver(payload: any): void {
        if (ActionType.RE_FRESH === payload.action) {
            this.fetchLinkProfileWithUser({
                startDate: this.startDate,
                endDate: this.endDate,
                profileId: this.profile.id
            });
        }
    }

    public filterActionReciver(payload: any): void {
        this.startDate = payload.startDate;
        this.endDate = payload.endDate;
        this.fetchLinkProfileWithUser({
            startDate: this.startDate,
            endDate: this.endDate,
            profileId: this.profile.id
        });
    }

    public enableActionReciver(payload: any): void {
        this.spinnerService.show();
        this.rppService.linkProfileWithUser({
            profileId: this.profile.id,
            appUserId: payload.id,
            linked: payload.linked,
        }).pipe(first())
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

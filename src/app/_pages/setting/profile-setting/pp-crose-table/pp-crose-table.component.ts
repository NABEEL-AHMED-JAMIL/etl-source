import { Component, OnInit } from '@angular/core';
import {
    ApiCode,
    RPPService,
    AuthResponse,
    ICrossTab,
    AuthenticationService,
    IStaticTable,
    ActionType
} from '../../../../_shared';
import { first } from 'rxjs';
import {
    AlertService,
    SpinnerService
} from '../../../../_helpers';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-pp-crose-table',
    templateUrl: './pp-crose-table.component.html',
    styleUrls: ['./pp-crose-table.component.css']
})
export class PPCroseTableComponent implements OnInit {

    public searchDetails: any;
    public sessionUser: AuthResponse;
    public ppCroseData: ICrossTab;
    public ppCroseTable: IStaticTable = {
        tableId: 'ppCrose_id',
        title: 'Profile X Permission',
        bordered: true,
        checkbox: false,
        size: 'small',
        headerButton: [
            {
                type: 'reload',
                color: 'red',
                spin: false,
                tooltipTitle: 'Refresh',
                action: ActionType.RE_FRESH
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
        this.fetchLinkProfilePermission({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    // profile&permission
    public fetchLinkProfilePermission(payload: any): any {
        this.spinnerService.show();
        this.rppService.fetchLinkProfilePermission(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    return;
                }
                this.ppCroseData = response.data;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

    public buttonEvent(action: ActionType): void {
        this.fetchLinkProfilePermission({
            sessionUser: {
                username: this.sessionUser.username
            }
        });
    }

    public onPPChange(linked: any, profileId: any, permissionId: any): void {
        let payload = {
            linked: linked,
            profileId: profileId,
            permissionId: permissionId,
            sessionUser: {
                username: this.sessionUser.username
            }
        }
        this.spinnerService.show();
        this.rppService.updateLinkProfilePermission(payload)
            .pipe(first())
            .subscribe((response: any) => {
                this.spinnerService.hide();
                if (response.status === ApiCode.ERROR) {
                    this.alertService.showError(response.message, ApiCode.ERROR);
                    this.ppCroseData.crossTab[profileId + 'X' + permissionId].key = !linked;
                    return;
                }
                this.ppCroseData.crossTab[profileId + 'X' + permissionId].key = linked;
            }, (response: any) => {
                this.spinnerService.hide();
                this.alertService.showError(response.error.message, ApiCode.ERROR);
            });
    }

}

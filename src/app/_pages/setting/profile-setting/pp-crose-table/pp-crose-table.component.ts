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
import { AlertService, CommomService } from '../../../../_helpers';

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
    public ppCroseTable = this.initStaticTable(); 

    constructor(
        private rppService: RPPService,
        private alertService: AlertService,
        private commomService: CommomService,
        private authenticationService: AuthenticationService) {
        this.sessionUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.fetchLinkProfilePermission({});
    }

    private initStaticTable(): IStaticTable {
        return {
            tableUuid: this.commomService.uuid(),
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
    }

    // profile&permission
    public fetchLinkProfilePermission(payload: any): any {
        this.rppService.fetchLinkProfilePermission(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.ppCroseData = response.data;
                })
            );
    }

    public buttonEvent(action: ActionType): void {
        this.fetchLinkProfilePermission({});
    }

    public onPPChange(linked: any, profileUuid: any, permissionUuid: any): void {
        let payload = {
            linked: linked,
            profileUuid: profileUuid,
            permissionUuid: permissionUuid
        }
        this.rppService.updateLinkProfilePermission(payload).pipe(first())
            .subscribe((response: any) => 
                this.handleApiResponse(response, () => {
                    this.ppCroseData.crossTab[profileUuid + '||' + permissionUuid].key = linked;
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

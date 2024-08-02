import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
    SideBar,
    SETTING_SIDEBAR,
    AuthenticationService,
    AuthResponse,
} from '../../_shared';
import {
    AlertService,
    SpinnerService,
    CommomService
} from 'src/app/_helpers';
import { Router } from '@angular/router';


@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

    public isCollapsed = false;
    public title: any = 'ETL Source 2023';
    public sessionUser: AuthResponse;
    public userPermission: any;

    public sidebars: SideBar[] = SETTING_SIDEBAR;

    constructor(
        public router: Router,
        public location: Location,
        public authenticationService: AuthenticationService,
        public alertService: AlertService,
        public spinnerService: SpinnerService,
        public commomService: CommomService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
                if (this.sessionUser) {
                    this.userPermission = currentUser.profile.permission;
                }
            });
    }

    ngOnInit(): void {
    }

    public hasPermissionAccess(userProfile: any): boolean {
        return this.userPermission.some((permission: any) => userProfile.includes(permission));
    }

    public home(): any {
        this.router.navigate(['/dashboard']);
    }

    public back(): any {
        this.location.back();
    }

}

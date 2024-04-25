import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService, AuthResponse, SETTING_SIDEBAR, SideBar } from '../../_shared';


@Component({
    selector: 'app-report-layout',
    templateUrl: './report-layout.component.html',
    styleUrls: ['./report-layout.component.css']
})
export class ReportLayoutComponent implements OnInit {

    public isCollapsed = false;
    public displayMainContent = false;
    public title: any = 'ETL Source 2023';
    public sidebars: SideBar[] = SETTING_SIDEBAR;

    public userPermission: any;
    public currentUser: AuthResponse;

    constructor(private router: Router,
        private location: Location,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.currentUser = currentUser;
                if (this.currentUser) {
                    this.userPermission = currentUser.profile.permission;
                }
            });
    }

    ngOnInit(): void {
    }

    public hasPermissionAccess(userProfile: any): any {
        return this.userPermission.some((permission: any) => userProfile.includes(permission));
    }

    public back(): any {
        this.location.back();
    }

    public home(): any {
        this.router.navigate(['/dashboard']);
    }

}

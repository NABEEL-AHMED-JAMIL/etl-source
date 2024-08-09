import { Component, OnInit } from '@angular/core';
import {
    AuthenticationService,
    AuthResponse,
} from 'src/app/_shared';


@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

    public title: any = 'ETL Source 2023';
    public sessionUser: AuthResponse;
    public userPermission: any;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService?.currentUser
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

}

import { Component } from "@angular/core";
import { AuthResponse, AuthenticationService } from "../_shared";
import { Router } from "@angular/router";
import { Location } from '@angular/common';


@Component({
    template: ''
  })
export abstract class RootLayout {

    public userPermission: any;
    public sessionUser: AuthResponse;

    constructor(
        private router: Router,
        private location: Location,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser
            .subscribe(currentUser => {
                this.sessionUser = currentUser;
                if (this.sessionUser) {
                    this.userPermission = currentUser.profile.permission;
                }
            });
    }

    public home(): any {
        this.router.navigate(['/dashboard']);
    }

    public back(): any {
        this.location.back();
    }

    public hasPermissionAccess(userProfile: any): boolean {
        return this.userPermission.some((permission: any) => userProfile.includes(permission));
    }

}
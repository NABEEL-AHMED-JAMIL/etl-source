import { Injectable } from '@angular/core';
import {
    Router, CanActivate, ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../_shared';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {


    constructor(private router: Router,
        private authenticationService: AuthenticationService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            if (this.hasPermissionAccess(currentUser.profile.permission, route.data['permission'])) {
                return true;
            }
            // authorised so return true
            this.router.navigate(['/404']);
            return false;
        }
        // { queryParams: { returnUrl: state.url }}
        this.router.navigate(['/login']);
        return false;
    }

    public hasAccess(userRoles: any, routeRoles: any) {
        return userRoles.some((role: any) => routeRoles.includes(role));
    }

    public hasPermissionAccess(userPermission: any, routePermission: any): any {
        return userPermission.some((permission: any) => routePermission.includes(permission));
    }
}
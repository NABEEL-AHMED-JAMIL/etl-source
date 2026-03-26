import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { CommomService } from './index';


/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private readonly router: Router,
        private readonly commomService: CommomService
    ) {}

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        const permission = route.data && route.data['permission'];
        if (permission && this.commomService.hasPermissionAccess(permission)) {
            return true;
        }
        this.router.navigate(['/404']);
        return false;
    }

}
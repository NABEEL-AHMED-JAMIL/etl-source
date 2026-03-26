import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {
    Observable,
    throwError
} from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AuthenticationService } from '../_shared';
import { StorageService } from './index';


/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
// Todo: Add popup to display error message to user
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private readonly router: Router,
        private readonly storageService: StorageService,
        private readonly authenticationService: AuthenticationService
    ) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                if ([401, 403].includes(err.status)) {
                    this.logoutAndRedirect();
                }
                return throwError(() => err);
            })
        );
    }

    private logoutAndRedirect(): void {
        this.authenticationService.logout()
            .pipe(first())
            .subscribe({
                next: () => this.performRedirect(),
                error: () => this.performRedirect()
            });
    }

    private performRedirect(): void {
        this.storageService.clear();
        this.router.navigate(['auth/login']);
    }
}
import { Injectable } from '@angular/core';
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
import { StorageService } from './storage.service';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {


    constructor(private router: Router,
        private storageService: StorageService,
        private authenticationService: AuthenticationService) { }


    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(err => {
                if ([401, 403].includes(err.status)) {
                    this.authenticationService.logout()
                        .pipe(first())
                        .subscribe(
                            (data: any) => {
                                this.storageService.clear();
                                this.router.navigate(['/login']);
                            },
                            (error: any) => {
                                this.storageService.clear();
                                this.router.navigate(['/login']);
                            });
                }
                return throwError(err);
            }));
    }
}
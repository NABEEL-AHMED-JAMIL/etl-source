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


@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout()
                .pipe(first())
                .subscribe(
                    data => {
                        location.reload();
                    },
                    error => {
                    });
            } 
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
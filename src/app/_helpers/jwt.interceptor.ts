import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '../_shared';


/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    constructor(private readonly authenticationService: AuthenticationService) {}

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.authenticationService.currentUserValue?.token;
        const authReq = token
            ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
            : request;

        return next.handle(authReq);
    }
}

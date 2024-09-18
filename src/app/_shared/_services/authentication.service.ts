import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../../_helpers';
import { ApiResponse, ApiService } from '../index';
import { map } from 'rxjs/operators';
import { AuthResponse } from '..';
import { config } from '../../../environments/environment';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<AuthResponse>;
    public currentUser: Observable<AuthResponse>;

    constructor(private apiService: ApiService,
        private storageService: StorageService) {
        this.currentUserSubject = new BehaviorSubject<AuthResponse>(this.storageService.get('currentUser'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): AuthResponse {
        return this.currentUserSubject.value;
    }

    public signInAppUser(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/auth.json/signInAppUser`, payload)
            .pipe(map(response => {
                if (response.data) {
                    this.storageService.set('currentUser', response.data);
                    this.currentUserSubject.next(response.data);
                }
                return response;
            }));
    }

    public signupAppUser(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/auth.json/signupAppUser`, payload);
    }

    public forgotPassword(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/auth.json/forgotPassword`, payload);
    }

    public resetPassword(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/auth.json/resetPassword`, payload);
    }

    /**
     * this will get token from header
     */
    public tokenVerify(): Observable<ApiResponse> {
        return this.apiService.getData(`${config.authBaseUrl}/appUser.json/tokenVerify`);
    }

    public authClamByRefreshToken(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/auth.json/authClamByRefreshToken`, payload)
        .pipe(map(response => {
            if (response.data) {
                this.storageService.set('currentUser', response.data);
                this.currentUserSubject.next(response.data);
            }
            return response;
        }));
    }

    public logout(): Observable<ApiResponse> {
        let refreshToken = this.storageService.get('currentUser')?.refreshToken;
        return this.apiService.postData(`${config.authBaseUrl}/auth.json/logoutAppUser`, {
            refreshToken: refreshToken
        }).pipe(map(response => {
            this.storageService.clear();
            this.currentUserSubject.next(null);
            return response;
        }));
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../../_helpers';
import { ApiResponse } from '../index';
import { map } from 'rxjs/operators';
import { AuthResponse } from '..';
import { config } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<AuthResponse>;
    public currentUser: Observable<AuthResponse>;

    constructor(private http: HttpClient,
        private storageService: StorageService) {
        this.currentUserSubject = new BehaviorSubject<AuthResponse>(
            this.storageService.get('currentUser'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): AuthResponse {
        return this.currentUserSubject.value;
    }

    public signInAppUser(payload: any): Observable<ApiResponse> {
        return this.http.post<any>(`${config.apiBaseUrl}/auth.json/signInAppUser`, payload)
            .pipe(map(response => {
                if (response.data) {
                    this.storageService.set('currentUser', response.data);
                    this.currentUserSubject.next(response.data);
                }
                return response;
            }));
    }

    public signupAppUser(payload: any): Observable<ApiResponse> {
        return this.http.post<any>(`${config.apiBaseUrl}/auth.json/signupAppUser`, payload);
    }

    public forgotPassword(payload: any): Observable<ApiResponse> {
        return this.http.post<any>(`${config.apiBaseUrl}/auth.json/forgotPassword`, payload);
    }

    public resetPassword(payload: any): Observable<ApiResponse> {
        return this.http.post<any>(`${config.apiBaseUrl}/auth.json/resetPassword`, payload);
    }

    public tokenVerify(token: any): Observable<ApiResponse> {
        return this.http.get<any>(`${config.apiBaseUrl}/appUser.json/tokenVerify`, {
            headers: { 'Authorization': token }
        });
    }

    public authClamByRefreshToken(payload: any): Observable<ApiResponse> {
        return this.http.post<any>(`${config.apiBaseUrl}/auth.json/authClamByRefreshToken`, payload)
        .pipe(map(response => {
            debugger
            if (response.data) {
                this.storageService.set('currentUser', response.data);
                this.currentUserSubject.next(response.data);
            }
            return response;
        }));
    }

    public logout(): Observable<ApiResponse> {
        let refreshToken = this.storageService.get('currentUser')?.refreshToken;
        return this.http.post<any>(`${config.apiBaseUrl}/auth.json/logoutAppUser`, {
            refreshToken: refreshToken
        }).pipe(map(response => {
            localStorage.clear();
            this.currentUserSubject.next(null);
            return response;
        }));
    }
}
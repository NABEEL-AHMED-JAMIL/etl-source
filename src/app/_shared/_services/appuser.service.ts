import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AppUserService {
    
    constructor(private http: HttpClient) { }

    public signupAppUser(payload: any): Observable<ApiResponse> {
        return this.http.post<any>(`${config.apiBaseUrl}/appUser.json/signupAppUser`, payload);
    }

    public updateAppUserProfile(payload: any): Observable<ApiResponse> {
        return this.http.post<any>(`${config.apiBaseUrl}/appUser.json/updateAppUserProfile`, payload);
    }

    public getSubAppUserAccount(payload: any): Observable<ApiResponse> {
        let params = new HttpParams();
        params = params.set('username', payload);
        return this.http.get<any>(`${config.apiBaseUrl}/appUser.json/getSubAppUserAccount`, { params });
    }

    public closeAppUserAccount(payload: any): Observable<ApiResponse> {
        return this.http.post<any>(`${config.apiBaseUrl}/appUser.json/closeAppUserAccount`, payload);
    }



}
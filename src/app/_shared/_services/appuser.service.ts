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

    public fetchAppUserProfile(payload: any): Observable<ApiResponse> {
        let params = new HttpParams();
        params = params.set('username', payload);
        return this.http.get<any>(`${config.apiBaseUrl}/appUser.json/fetchAppUserProfile`, { params });
    }

    public updateAppUserProfile(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/updateAppUserProfile`, payload);
    }

    public updateAppUserCompany(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/updateAppUserCompany`, payload);
    }

    public updateAppUserEnvVariable(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/updateAppUserEnvVariable`, payload);
    }

    public updateAppUserPassword(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/updateAppUserPassword`, payload);
    }

    public closeAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/closeAppUserAccount`, payload);
    }

    public deleteAllAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/deleteAllAppUserAccount`, payload);
    }    

    public fetchAllAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/fetchAllAppUserAccount`, payload);
    }

    public addAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/addAppUserAccount`, payload);
    }

    public editAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/editAppUserAccount`, payload);
    }

    public enabledDisabledAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/enabledDisabledAppUserAccount`, payload);
    }    

}
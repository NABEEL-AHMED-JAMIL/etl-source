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

    public updateAppUserEnvVariable(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/updateAppUserEnvVariable`, payload);
    }

    public updateAppUserPassword(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/updateAppUserPassword`, payload);
    }

    public deleteAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/deleteAppUserAccount`, payload);
    }

    public deleteAllAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/deleteAllAppUserAccount`, payload);
    }

    public downloadAppUserAccount(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/downloadAppUserAccount`, payload,
            {
                responseType: 'blob'
            });
    }

    public fetchAllAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/fetchAllAppUserAccount`, payload);
    }

    public addAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/addAppUserAccount`, payload);
    }

    public updateAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/updateAppUserAccount`, payload);
    }

    public enabledDisabledAppUserAccount(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/enabledDisabledAppUserAccount`, payload);
    }    

}
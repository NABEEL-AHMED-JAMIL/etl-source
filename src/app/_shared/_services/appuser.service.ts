import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiResponse, ApiService } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class AppUserService {

    constructor(private apiService: ApiService) {}

    public fetchAppUserProfile(payload: any): Observable<ApiResponse> {
        let params = new HttpParams();
        params = params.set('username', payload);
        return this.apiService.getData(`${config.authBaseUrl}/appUser.json/fetchAppUserProfile`, params);
    }

    public updateAppUserEnvVariable(payload:any): Observable<any> {
        return this.apiService.postData(`${config.authBaseUrl}/appUser.json/updateAppUserEnvVariable`, payload);
    }

    public updateAppUserPassword(payload:any): Observable<any> {
        return this.apiService.postData(`${config.authBaseUrl}/appUser.json/updateAppUserPassword`, payload);
    }

    public addAppUserAccount(payload:any): Observable<any> {
        return this.apiService.postData(`${config.authBaseUrl}/appUser.json/addAppUserAccount`, payload);
    }

    public updateAppUserAccount(payload:any): Observable<any> {
        return this.apiService.postData(`${config.authBaseUrl}/appUser.json/updateAppUserAccount`, payload);
    }

    public fetchAllAppUserAccount(payload:any): Observable<any> {
        return this.apiService.postData(`${config.authBaseUrl}/appUser.json/fetchAllAppUserAccount`, payload);
    }

    public deleteAppUserAccount(payload:any): Observable<any> {
        return this.apiService.postData(`${config.authBaseUrl}/appUser.json/deleteAppUserAccount`, payload);
    }

    public deleteAllAppUserAccount(payload:any): Observable<any> {
        return this.apiService.postData(`${config.authBaseUrl}/appUser.json/deleteAllAppUserAccount`, payload);
    }

    public downloadAppUserAccount(payload: any): Observable<any> {
        let params = new HttpParams();
        params = params.set('responseType', 'blob');
        return this.apiService.postData(`${config.authBaseUrl}/appUser.json/downloadAppUserAccount`, payload, params);
    }

    public enabledDisabledAppUserAccount(payload:any): Observable<any> {
        return this.apiService.postData(`${config.authBaseUrl}/appUser.json/enabledDisabledAppUserAccount`, payload);
    }    

}
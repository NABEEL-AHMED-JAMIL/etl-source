import { Injectable } from '@angular/core';
import { ApiResponse } from '../_model/object';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class RPPService {

    constructor(private apiService: ApiService) { }

    // role
    public addRole(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/addRole`, payload);
    }

    public updateRole(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/updateRole`, payload);
    }

    public fetchAllRole(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/fetchAllRole`, payload);
    }

    public findRoleById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/findRoleById`, payload);
    }

    public deleteRoleById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/deleteRoleById`, payload);
    }

    public deleteAllRole(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/deleteAllRole`, payload);
    }

    public downloadRoleTemplateFile(): Observable<any> {
        let params = new HttpParams();
        params = params.set('responseType', 'blob');
        return this.apiService.getData(`${config.authBaseUrl}/rpp.json/downloadRoleTemplateFile`, params);
    }

    public downloadRole(payload: any): Observable<any> {
        let params = new HttpParams();
        params = params.set('responseType', 'blob');
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/downloadRole`, payload, params);
    }

    public uploadRole(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/uploadRole`, payload);
    }

    public addProfile(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/addProfile`, payload);
    }

    public updateProfile(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/updateProfile`, payload);
    }

    public fetchAllProfile(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/fetchAllProfile`, payload);
    }

    public fetchProfileById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/fetchProfileById`, payload);
    }

    public deleteProfileById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/deleteProfileById`, payload);
    }

    public deleteAllProfile(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/deleteAllProfile`, payload);
    }

    public downloadProfileTemplateFile(): Observable<any> {
        let params = new HttpParams();
        params = params.set('responseType', 'blob');
        return this.apiService.getData(`${config.authBaseUrl}/rpp.json/downloadProfileTemplateFile`, params);
    }

    public downloadProfile(payload: any): Observable<any> {
        let params = new HttpParams();
        params = params.set('responseType', 'blob');
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/downloadProfile`, payload, params);
    }

    public uploadProfile(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/uploadProfile`, payload);
    }

    // permission
    public addPermission(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/addPermission`, payload);
    }

    public updatePermission(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/updatePermission`, payload);
    }

    public fetchAllPermission(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/fetchAllPermission`, payload);
    }

    public fetchPermissionById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/fetchPermissionById`, payload);
    }

    public deletePermissionById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/deletePermissionById`, payload);
    }

    public deleteAllPermission(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/deleteAllPermission`, payload);
    }
    
    public downloadPermissionTemplateFile(): Observable<any> {
        let params = new HttpParams();
        params = params.set('responseType', 'blob');
        return this.apiService.getData(`${config.authBaseUrl}/rpp.json/downloadPermissionTemplateFile`, params);
    }

    public downloadPermission(payload: any): Observable<any> {
        let params = new HttpParams();
        params = params.set('responseType', 'blob');
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/downloadPermission`, payload, params);
    }

    public uploadPermission(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/uploadPermission`, payload);
    }

    public fetchLinkProfilePermission(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/fetchLinkProfilePermission`, payload);
    }

    public updateLinkProfilePermission(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/updateLinkProfilePermission`, payload);
    }

    public fetchLinkRoleWithUser(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/fetchLinkRoleWithUser`, payload);
    }

    public linkRoleWithUser(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/linkRoleWithUser`, payload);
    }

    public fetchLinkProfileWithUser(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/fetchLinkProfileWithUser`, payload);
    }

    public linkProfileWithUser(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/linkProfileWithUser`, payload);
    }
    
    public fetchProfileWithUser(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/fetchProfileWithUser`, payload);
    }

    public fetchRoleWithUser(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/rpp.json/fetchRoleWithUser`, payload);
    }

}
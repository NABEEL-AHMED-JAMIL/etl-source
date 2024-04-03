import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../_model/object';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class RPPService {

    constructor(private http: HttpClient) { }

    // role
    public addRole(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/addRole`, payload);
    }

    public updateRole(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/updateRole`, payload);
    }

    public fetchAllRole(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/fetchAllRole`, payload);
    }

    public findRoleById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/findRoleById`, payload);
    }

    public deleteRoleById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/deleteRoleById`, payload);
    }

    public downloadRoleTemplateFile(): Observable<any> {
        return this.http.get(`${config.apiBaseUrl}/rpp.json/downloadRoleTemplateFile`,
            {
                responseType: 'blob'
            });
    }

    public downloadRole(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/downloadRole`, payload,
            {
                responseType: 'blob'
            });
    }

    public uploadRole(payload: any): Observable<ApiResponse> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/uploadRole`, payload);
    }


    public addProfile(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/addProfile`, payload);
    }

    public updateProfile(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/updateProfile`, payload);
    }

    public fetchAllProfile(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/fetchAllProfile`, payload);
    }

    public fetchProfileById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/fetchProfileById`, payload);
    }

    public deleteProfileById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/deleteProfileById`, payload);
    }

    public downloadProfileTemplateFile(): Observable<any> {
        return this.http.get(`${config.apiBaseUrl}/rpp.json/downloadProfileTemplateFile`,
            {
                responseType: 'blob'
            });
    }

    public downloadProfile(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/downloadProfile`, payload,
            {
                responseType: 'blob'
            });
    }

    public uploadProfile(payload: any): Observable<ApiResponse> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/uploadProfile`, payload);
    }

    // permission
    public addPermission(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/addPermission`, payload);
    }

    public updatePermission(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/updatePermission`, payload);
    }

    public fetchAllPermission(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/fetchAllPermission`, payload);
    }

    public fetchPermissionById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/fetchPermissionById`, payload);
    }

    public deletePermissionById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/deletePermissionById`, payload);
    }

    public downloadPermissionTemplateFile(): Observable<any> {
        return this.http.get(`${config.apiBaseUrl}/rpp.json/downloadPermissionTemplateFile`,
            {
                responseType: 'blob'
            });
    }

    public downloadPermission(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/downloadPermission`, payload,
            {
                responseType: 'blob'
            });
    }

    public uploadPermission(payload: any): Observable<ApiResponse> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/uploadPermission`, payload);
    }

    public fetchLinkProfilePermission(payload: any): Observable<ApiResponse> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/fetchLinkProfilePermission`, payload);
    }

    public updateLinkProfilePermission(payload: any): Observable<ApiResponse> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/updateLinkProfilePermission`, payload);
    }

    public fetchLinkRoleWithRootUser(payload: any): Observable<ApiResponse> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/fetchLinkRoleWithRootUser`, payload);
    }

    public linkRoleWithRootUser(payload: any): Observable<ApiResponse> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/linkRoleWithRootUser`, payload);
    }

    public fetchLinkProfileWithRootUser(payload: any): Observable<ApiResponse> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/fetchLinkProfileWithRootUser`, payload);
    }

    public linkProfileWithRootUser(payload: any): Observable<ApiResponse> {
        return this.http.post(`${config.apiBaseUrl}/rpp.json/linkProfileWithRootUser`, payload);
    }

}
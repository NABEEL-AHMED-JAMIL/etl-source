import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(private http: HttpClient) {
    }

    public addOrg(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/addOrg`, payload);
    }

    public updateOrg(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/updateOrg`, payload);

    }

    public fetchOrgById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/fetchOrgById`, payload);
    }

    public fetchAllOrg(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/fetchAllOrg`, payload);
    }

    public deleteOrgById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/deleteOrgById`, payload);
    }

    public deleteAllOrg(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/deleteAllOrg`, payload);
    }

    public downloadOrgTemplateFile(): Observable<any> {
        return this.http.get(`${config.apiBaseUrl}/organization.json/downloadOrgTemplateFile`,
            {
                responseType: 'blob'
            });
    };

    public downloadOrg(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/organization.json/downloadOrg`, payload,
            {
                responseType: 'blob'
            });
    }

    public uploadOrg(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/organization.json/uploadOrg`, payload);
    }

}
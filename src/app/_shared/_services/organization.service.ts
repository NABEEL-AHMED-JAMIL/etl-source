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

    public addOrgAccount(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/addOrgAccount`, payload);
    }

    public updateOrgAccount(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/updateOrgAccount`, payload);
    }

    public fetchOrgAccountById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/fetchOrgAccountById`, payload);
    }

    public fetchAllOrgAccount(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/fetchAllOrgAccount`, payload);
    }

    public deleteOrgAccountById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/deleteOrgAccountById`, payload);
    }

    public deleteAllOrgAccount(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/organization.json/deleteAllOrgAccount`, payload);
    }

}
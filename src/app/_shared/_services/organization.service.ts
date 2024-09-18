import { Injectable } from '@angular/core';
import { ApiResponse, ApiService, } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(private apiService: ApiService) { }

    public addOrgAccount(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/organization.json/addOrgAccount`, payload);
    }

    public updateOrgAccount(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/organization.json/updateOrgAccount`, payload);
    }

    public fetchOrgAccountById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/organization.json/fetchOrgAccountById`, payload);
    }

    public fetchAllOrgAccount(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/organization.json/fetchAllOrgAccount`, payload);
    }

    public deleteOrgAccountById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/organization.json/deleteOrgAccountById`, payload);
    }

    public deleteAllOrgAccount(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/organization.json/deleteAllOrgAccount`, payload);
    }

}
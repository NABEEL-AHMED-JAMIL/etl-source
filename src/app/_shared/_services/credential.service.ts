import { Injectable } from '@angular/core';
import { ApiResponse, ApiService } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class CredentailService {

    constructor(private apiService: ApiService) { }

    public addCredential(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/credential.json/addCredential`, payload);
    }

    public updateCredential(payload: any): Observable<ApiResponse> {
        return this.apiService.updateData(`${config.apiBaseUrl}/credential.json/updateCredential`, payload);
    }

    public fetchCredentialById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/credential.json/fetchCredentialById`, payload);
    }

    public fetchAllCredential(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/credential.json/fetchAllCredential`, payload);
    }

    public fetchAllCredentialByType(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/credential.json/fetchAllCredentialByType`, payload);
    }

    public deleteCredential(payload: any): Observable<ApiResponse> {
        return this.apiService.updateData(`${config.apiBaseUrl}/credential.json/deleteCredential`, payload);
    }

    public deleteAllCredential(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/credential.json/deleteAllCredential`, payload);
    }

}
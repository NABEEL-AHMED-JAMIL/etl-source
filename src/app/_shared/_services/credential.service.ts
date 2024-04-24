import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CredentailService {

    constructor(private http: HttpClient) { }

    public addCredential(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/credential.json/addCredential`, payload);
    }

    public updateCredential(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(`${config.apiBaseUrl}/credential.json/updateCredential`, payload);
    }

    public fetchCredentialById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/credential.json/fetchCredentialById`, payload);
    }

    public fetchAllCredential(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/credential.json/fetchAllCredential`, payload);
    }

    public deleteCredential(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(`${config.apiBaseUrl}/credential.json/deleteCredential`, payload);
    }

    public deleteAllCredential(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/credential.json/deleteAllCredential`, payload);
    }

}
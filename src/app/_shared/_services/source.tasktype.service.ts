import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SourceTaskTypeService {

    constructor(private http: HttpClient) { }

    public addSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/stt.json/addSTT`, payload);
    }

    public editSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/stt.json/editSTT`, payload);
    }

    public deleteSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/stt.json/deleteSTT`, payload);
    }

    public fetchAllSTTLinkForm(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/stt.json/fetchAllSTTLinkForm`, payload);
    }

    public linkSTTForm(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/stt.json/linkSTTForm`, payload);
    }

    public fetchSTTBySttId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/stt.json/fetchSTTBySttId`, payload);
    }

    public fetchAllSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/stt.json/fetchAllSTT`, payload);
    }

    public deleteAllSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/stt.json/deleteAllSTT`, payload);
    }


}
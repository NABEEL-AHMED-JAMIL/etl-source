import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../_model/object';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class MgGroupService {

    constructor(private http: HttpClient) { }

    public addGroup(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/mgGroup.json/addGroup`, payload);
    }

    public updateGroup(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/mgGroup.json/updateGroup`, payload);
    }

    public fetchAllGroup(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/mgGroup.json/fetchAllGroup`, payload);
    }

    public fetchGroupById(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/mgGroup.json/fetchGroupById`, payload);
    }

    public deleteGroupById(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/mgGroup.json/deleteGroupById`, payload);
    }

    public deleteAllGroup(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/mgGroup.json/deleteAllGroup`, payload);
    }

    public downloadGroupTemplateFile(): Observable<any> {
        return this.http.get(`${config.apiBaseUrl}/mgGroup.json/downloadGroupTemplateFile`,
            {
                responseType: 'blob'
            });
    }

    public downloadGroup(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/mgGroup.json/downloadGroup`, payload,
            {
                responseType: 'blob'
            });
    }

    public uploadGroup(payload: any): Observable<ApiResponse> {
        return this.http.post(`${config.apiBaseUrl}/mgGroup.json/uploadGroup`, payload);
    }

}
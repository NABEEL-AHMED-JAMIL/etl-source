import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '..';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SettingService {
    
    constructor(private http: HttpClient) { }

    public dynamicQueryResponse(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/dynamicQueryResponse`, payload);
    }

    public getXmlData(payload:any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/xmlCreateChecker`, payload);
    }

    public addTemplateReg(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/addTemplateReg`, payload);
    }

    public deleteTemplateReg(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/deleteTemplateReg`, payload);
    }

    public editTemplateReg(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/editTemplateReg`, payload);
    }

    public fetchTemplateReg(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/fetchTemplateReg`, payload);
    }

    public findTemplateRegByTemplateId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/findTemplateRegByTemplateId`, payload);
    }

    public downloadDynamicQueryFile(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/setting.json/downloadDynamicQueryFile`, payload,
        {
            responseType: 'blob'
        });
    }

}
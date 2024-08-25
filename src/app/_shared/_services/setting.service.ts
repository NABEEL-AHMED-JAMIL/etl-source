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

    public fetchStatisticsDashboard(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/fetchStatisticsDashboard`, payload);
    }

    public fetchCountryData(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/fetchCountryData`, payload);
    }

    // query
    public dynamicQueryResponse(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/dynamicQueryResponse`, payload);
    }

    public downloadDynamicQueryFile(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/setting.json/downloadDynamicQueryFile`, payload,
            {
                responseType: 'blob'
            });
    }

    public deleteTemplateReg(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/deleteTemplateReg`, payload);
    }

    public updateTemplateReg(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/updateTemplateReg`, payload);
    }

    public fetchTemplateReg(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/fetchTemplateReg`, payload);
    }

    public findTemplateRegByTemplateId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/findTemplateRegByTemplateId`, payload);
    }

    public addQueryInquiry(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/addQueryInquiry`, payload);
    }

    public updateQueryInquiry(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/updateQueryInquiry`, payload);
    }

    public fetchQueryInquiryById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/fetchQueryInquiryById`, payload);
    }

    public fetchAllQueryInquiry(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/fetchAllQueryInquiry`, payload);
    }

    public deleteQueryInquiryById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/deleteQueryInquiryById`, payload);
    }

    public deleteAllQueryInquiry(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/setting.json/deleteAllQueryInquiry`, payload);
    }


}
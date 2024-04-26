import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../_model/object';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class ReportSettingService {

    constructor(private http: HttpClient) { }

    public addReportSetting(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/addReportSetting`, payload);
    }

    public updateReportSetting(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/updateReportSetting`, payload);
    }

    public fetchAllReportSetting(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/fetchAllReportSetting`, payload);
    }

    public fetchReportSettingByReportId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/fetchReportSettingByReportId`, payload);
    }

    public fetchAllReportByGroup(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/fetchAllReportByGroup`, payload);
    }

    public deleteReportSettingById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/deleteReportSettingById`, payload);
    }

    public deleteAllReportSetting(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/deleteAllReportSetting`, payload);
    }

}
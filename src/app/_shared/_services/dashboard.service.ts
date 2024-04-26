import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../_model/object';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }

    public addDashboardSetting(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/addDashboardSetting`, payload);
    }

    public updateDashboardSetting(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/updateDashboardSetting`, payload);
    }

    public fetchAllDashboardSetting(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/fetchAllDashboardSetting`, payload);
    }

    public fetchDashboardSettingByDashboardId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/fetchDashboardSettingByDashboardId`, payload);
    }

    public fetchAllDashboardSettingByGroup(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/fetchAllDashboardSettingByGroup`, payload);
    }

    public deleteDashboardSettingById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/deleteDashboardSettingById`, payload);
    }

    public deleteAllDashboardSetting(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/deleteAllDashboardSetting`, payload);
    }

}
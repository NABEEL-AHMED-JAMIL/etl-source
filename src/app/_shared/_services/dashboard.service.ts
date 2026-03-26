import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';
import {
    ApiResponse,
    ApiService
} from '../../_shared';


/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private readonly apiService: ApiService) { }

    public addDashboardSetting(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/dashboardSetting.json/addDashboardSetting`, payload);
    }

    public updateDashboardSetting(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/dashboardSetting.json/updateDashboardSetting`, payload);
    }

    public fetchAllDashboardSetting(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/dashboardSetting.json/fetchAllDashboardSetting`, payload);
    }

    public fetchDashboardSettingByDashboardId(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/dashboardSetting.json/fetchDashboardSettingByDashboardId`, payload);
    }

    public fetchAllDashboardSettingByType(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/dashboardSetting.json/fetchAllDashboardSettingByType`, payload);
    }

    public fetchAllDashboardSettingByGroup(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/dashboardSetting.json/fetchAllDashboardSettingByGroup`, payload);
    }

    public deleteDashboardSettingById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/dashboardSetting.json/deleteDashboardSettingById`, payload);
    }

    public deleteAllDashboardSetting(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/dashboardSetting.json/deleteAllDashboardSetting`, payload);
    }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../index';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AppPageSettingServics {

    constructor(private http: HttpClient) {
    }

	public addAppPageSetting(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/appPageSetting.json/addAppPageSetting`, payload);
	}

	public updateAppPageSetting(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/appPageSetting.json/updateAppPageSetting`, payload);
	}

	public fetchAppPageSettingById(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/appPageSetting.json/fetchAppPageSettingById`, payload);
	}

	public fetchAllAppPageSetting(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/appPageSetting.json/fetchAllAppPageSetting`, payload);
	}

	public deleteAppPageSetting(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/appPageSetting.json/deleteAppPageSetting`, payload);
	}

    public deleteAllAppPageSetting(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/appPageSetting.json/deleteAllAppPageSetting`, payload);
	}
    
}
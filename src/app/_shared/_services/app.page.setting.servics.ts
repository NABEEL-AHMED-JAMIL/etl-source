import { Injectable } from '@angular/core';
import { ApiResponse, ApiService } from '../index';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class AppPageSettingServics {

    constructor(private apiService: ApiService) {}

	public addAppPageSetting(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/appPageSetting.json/addAppPageSetting`, payload);
	}

	public updateAppPageSetting(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/appPageSetting.json/updateAppPageSetting`, payload);
	}

	public fetchAppPageSettingById(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/appPageSetting.json/fetchAppPageSettingById`, payload);
	}

	public fetchAllAppPageSetting(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/appPageSetting.json/fetchAllAppPageSetting`, payload);
	}

	public deleteAppPageSetting(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/appPageSetting.json/deleteAppPageSetting`, payload);
	}

    public deleteAllAppPageSetting(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/appPageSetting.json/deleteAllAppPageSetting`, payload);
	}
    
}
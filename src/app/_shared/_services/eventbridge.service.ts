import { Injectable } from '@angular/core';
import { ApiResponse, ApiService } from '../index';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class EvenBridgeService {

	constructor(private apiService: ApiService) { }

	public addEventBridge(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/addEventBridge`, payload);
	}

	public updateEventBridge(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/updateEventBridge`, payload);
	}

    public fetchAllEventBridge(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/fetchAllEventBridge`, payload);
	}

    public fetchEventBridgeById(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/fetchEventBridgeById`, payload);
	}

    public fetchEventBridgeByBridgeType(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/fetchEventBridgeByBridgeType`, payload);
	}

    public deleteEventBridgeById(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/deleteEventBridgeById`, payload);
	}

    public deleteAllEventBridge(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/deleteAllEventBridge`, payload);
	}

    public fetchLinkEventBridgeWitUser(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/fetchLinkEventBridgeWitUser`, payload);
	}

    public linkEventBridgeWithUser(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/linkEventBridgeWithUser`, payload);
	}

    public genEventBridgeToken(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/genEventBridgeToken`, payload);
	}

    public downloadEventBridgeTemplateFile(payload: any): Observable<any> {
		let params = new HttpParams();
        params = params.set('responseType', 'blob');
        return this.apiService.getData(`${config.apiBaseUrl}/eventBridge.json/downloadEventBridgeTemplateFile`, params);
	}

    public downloadEventBridge(payload: any): Observable<any> {
		let params = new HttpParams();
        params = params.set('responseType', 'blob');
        return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/downloadEventBridge`, payload, params);
	}

    public uploadEventBridge(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/eventBridge.json/uploadEventBridge`, payload);
	}
    
}
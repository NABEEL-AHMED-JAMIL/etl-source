import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../index';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class EvenBridgeService {

    constructor(private http: HttpClient) {
    }

	public addEventBridge(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eventBridge.json/addEventBridge`, payload);
	}

	public updateEventBridge(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eventBridge.json/updateEventBridge`, payload);
	}

    public fetchAllEventBridge(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eventBridge.json/fetchAllEventBridge`, payload);
	}

    public fetchEventBridgeById(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eventBridge.json/fetchEventBridgeById`, payload);
	}

    public fetchEventBridgeByBridgeType(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eventBridge.json/fetchEventBridgeByBridgeType`, payload);
	}

    public deleteEventBridgeById(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eventBridge.json/deleteEventBridgeById`, payload);
	}

    public deleteAllEventBridge(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eventBridge.json/deleteAllEventBridge`, payload);
	}

    public fetchLinkEventBridgeWitUser(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eventBridge.json/fetchLinkEventBridgeWitUser`, payload);
	}

    public linkEventBridgeWithUser(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eventBridge.json/linkEventBridgeWithUser`, payload);
	}

    public genEventBridgeToken(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eventBridge.json/genEventBridgeToken`, payload);
	}

    public downloadEventBridgeTemplateFile(payload: any): Observable<any> {
        return this.http.get(`${config.apiBaseUrl}/eventBridge.json/downloadEventBridgeTemplateFile`,
        {
            responseType: 'blob'
        });
	}

    public downloadEventBridge(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/eventBridge.json/downloadEventBridge`, payload,
        {
            responseType: 'blob'
        });
	}

    public uploadEventBridge(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eventBridge.json/uploadEventBridge`, payload);
	}
    
}
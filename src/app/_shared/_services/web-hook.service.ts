import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../index';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class WebHookService {

    constructor(private http: HttpClient) {
    }

	public addWebHook(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/webHook.json/addWebHook`, payload);
	}

	public updateWebHook(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/webHook.json/updateWebHook`, payload);
	}

    public fetchAllWebHook(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/webHook.json/fetchAllWebHook`, payload);
	}

    public fetchWebHookById(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/webHook.json/fetchWebHookById`, payload);
	}

    public deleteWebHookById(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/webHook.json/deleteWebHookById`, payload);
	}

    public deleteAllWebHook(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/webHook.json/deleteAllWebHook`, payload);
	}

    public fetchLinkWebHookWitUser(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/webHook.json/fetchLinkWebHookWitUser`, payload);
	}

    public linkWebHookWithUser(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/webHook.json/linkWebHookWithUser`, payload);
	}

    public genWebHookToken(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/webHook.json/genWebHookToken`, payload);
	}    
    
}
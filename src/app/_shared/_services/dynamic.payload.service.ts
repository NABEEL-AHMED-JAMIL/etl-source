import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../_model/object';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class DynamicPayloadService {

    constructor(private http: HttpClient) { }

    public addDynamicPayload(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/dynamicPayload.json/addDynamicPayload`, payload);
	}

    public updateDynamicPayload(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/dynamicPayload.json/updateDynamicPayload`, payload);
	}

    public fetchAllDynamicPayload(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/dynamicPayload.json/fetchAllDynamicPayload`, payload);
	}

    public fetchDynamicPayloadById(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/dynamicPayload.json/fetchDynamicPayloadById`, payload);
	}

    public deleteDynamicPayloadById(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/dynamicPayload.json/deleteDynamicPayloadById`, payload);
	}

    public deleteAllDynamicPayload(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/dynamicPayload.json/deleteAllDynamicPayload`, payload);
	}

    public dynamicPaylaod(payload: any, switchValue: any): Observable<ApiResponse>{
        return this.http.post<ApiResponse>(switchValue ? `${config.apiBaseUrl}/dynamicPayload.json/jsonCreateChecker` : `${config.apiBaseUrl}/dynamicPayload.json/xmlCreateChecker`, payload);        
    }

}
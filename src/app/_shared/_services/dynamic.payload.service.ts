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
export class DynamicPayloadService {

    constructor(private readonly apiService: ApiService) { }

    public addDynamicPayload(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/dynamicPayload.json/addDynamicPayload`, payload);
	}

    public updateDynamicPayload(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/dynamicPayload.json/updateDynamicPayload`, payload);
	}

    public fetchAllDynamicPayload(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/dynamicPayload.json/fetchAllDynamicPayload`, payload);
	}

    public fetchDynamicPayloadById(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/dynamicPayload.json/fetchDynamicPayloadById`, payload);
	}

    public deleteDynamicPayloadById(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/dynamicPayload.json/deleteDynamicPayloadById`, payload);
	}

    public deleteAllDynamicPayload(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/dynamicPayload.json/deleteAllDynamicPayload`, payload);
	}

    public dynamicPaylaod(payload: any, switchValue: any): Observable<ApiResponse>{
        return this.apiService.postData(switchValue ? `${config.apiBaseUrl}/dynamicPayload.json/jsonCreateChecker` : `${config.apiBaseUrl}/dynamicPayload.json/xmlCreateChecker`, payload);        
    }

}
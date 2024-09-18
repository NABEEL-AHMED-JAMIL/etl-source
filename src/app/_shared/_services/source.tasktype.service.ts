import { Injectable } from '@angular/core';
import { ApiResponse, ApiService } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class SourceTaskTypeService {

    constructor(private apiService: ApiService) { }

    public addSTT(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/stt.json/addSTT`, payload);
    }

    public updateSTT(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/stt.json/updateSTT`, payload);
    }

    public deleteSTT(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/stt.json/deleteSTT`, payload);
    }

    public fetchAllSTTLinkForm(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/stt.json/fetchAllSTTLinkForm`, payload);
    }

    public linkSTTForm(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/stt.json/linkSTTForm`, payload);
    }

    public fetchSTTBySttId(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/stt.json/fetchSTTBySttId`, payload);
    }

    public fetchAllSTT(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/stt.json/fetchAllSTT`, payload);
    }

    public deleteAllSTT(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/stt.json/deleteAllSTT`, payload);
    }

}
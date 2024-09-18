import { Injectable } from '@angular/core';
import { ApiResponse } from '../_model/object';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';
import { ApiService } from './api.service';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class SourceTaskService {

    constructor(private apiService: ApiService) { }

    public addSourceTask(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/source_task.json/addSourceTask`, payload);
    }

    public updateSourceTask(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/source_task.json/updateSourceTask`, payload);
    }

    public deleteSourceTask(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/source_task.json/deleteSourceTask`, payload);
    }

    public deleteAllSourceTask(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/source_task.json/deleteAllSourceTask`, payload);
    }

    public fetchAllSourceTask(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/source_task.json/fetchAllSourceTask`, payload);
    }

    public fetchSourceTaskById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/source_task.json/fetchSourceTaskById`, payload);
    }

    public fetchAllSTT(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/source_task.json/fetchAllSTT`, payload);
    }

}
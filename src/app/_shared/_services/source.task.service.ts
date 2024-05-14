import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../_model/object';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SourceTaskService {

    constructor(private http: HttpClient) { }


    public addSourceTask(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/source_task.json/addSourceTask`, payload);
    }

    public editSourceTask(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/source_task.json/editSourceTask`, payload);
    }

    public deleteSourceTask(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/source_task.json/deleteSourceTask`, payload);
    }

    public deleteAllSourceTask(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/source_task.json/deleteAllSourceTask`, payload);
    }

    public fetchAllSourceTask(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/source_task.json/fetchAllSourceTask`, payload);
    }

    public fetchSourceTaskById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/source_task.json/fetchSourceTaskById`, payload);
    }

    public fetchAllSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/source_task.json/fetchAllSTT`, payload);
    }

}
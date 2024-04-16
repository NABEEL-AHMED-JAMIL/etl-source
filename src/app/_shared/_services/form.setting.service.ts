import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class FormSettingService {

    constructor(private http: HttpClient) {
    }

    public addForm(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/addForm`, payload);
    }

    public editForm(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/editForm`, payload);
    }

    public deleteFormById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/deleteFormById`, payload);
    }

    public fetchFormByFormId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchFormByFormId`, payload);
    }

    public fetchForms(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchForms`, payload);
    }

    public addSection(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/addSection`, payload);
    }

    public editSection(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/editSection`, payload);
    }

    public deleteSectionById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/deleteSectionById`, payload);
    }

    public fetchSectionBySectionId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchSectionBySectionId`, payload);
    }

    public fetchSections(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchSections`, payload);
    }

    public addControl(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/addControl`, payload);
    }

    public editControl(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/editControl`, payload);
    }

    public deleteControlById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/deleteControlById`, payload);
    }

    public fetchControlByControlId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchControlByControlId`, payload);
    }

    public fetchControls(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchControls`, payload);
    }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../index';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class TemplateRegService {

    constructor(private http: HttpClient) {
    }

	public addTemplateReg(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/templateReg.json/addTemplateReg`, payload);
	}

	public updateTemplateReg(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/templateReg.json/updateTemplateReg`, payload);
	}

	public findTemplateRegByTemplateId(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/templateReg.json/findTemplateRegByTemplateId`, payload);
	}

	public fetchTemplateReg(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/templateReg.json/fetchTemplateReg`, payload);
	}

	public deleteTemplateReg(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/templateReg.json/deleteTemplateReg`, payload);
	}

    public deleteAllTemplateReg(payload: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${config.apiBaseUrl}/templateReg.json/deleteAllTemplateReg`, payload);
	}
    
}
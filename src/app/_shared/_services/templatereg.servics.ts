import { Injectable } from '@angular/core';
import { ApiResponse, ApiService } from '../index';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class TemplateRegService {

	constructor(private apiService: ApiService) { }

	public addTemplateReg(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/templateReg.json/addTemplateReg`, payload);
	}

	public updateTemplateReg(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/templateReg.json/updateTemplateReg`, payload);
	}

	public findTemplateRegByTemplateId(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/templateReg.json/findTemplateRegByTemplateId`, payload);
	}

	public fetchTemplateReg(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/templateReg.json/fetchTemplateReg`, payload);
	}

	public deleteTemplateReg(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/templateReg.json/deleteTemplateReg`, payload);
	}

    public deleteAllTemplateReg(payload: any): Observable<ApiResponse> {
		return this.apiService.postData(`${config.apiBaseUrl}/templateReg.json/deleteAllTemplateReg`, payload);
	}
    
}
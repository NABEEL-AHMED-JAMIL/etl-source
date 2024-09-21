import { Injectable } from '@angular/core';
import { ApiResponse } from '../_model/object';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class EVariableService {

    constructor(private apiService: ApiService) { }

    public addEnVariable(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/eVariable.json/addEnVariable`, payload);
    }

    public updateEnVariable(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/eVariable.json/updateEnVariable`, payload);
    }

    public fetchAllEnVariable(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/eVariable.json/fetchAllEnVariable`, payload);
    }

    public fetchEnVariableById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/eVariable.json/fetchEnVariableById`, payload);
    }

    public fetchUserEnvByEnvKey(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/eVariable.json/fetchUserEnvByEnvKey`, payload);
    }

    public deleteEnVariableById(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/eVariable.json/deleteEnVariableById`, payload);
    }

    public deleteAllEnVariable(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/eVariable.json/deleteAllEnVariable`, payload);
    }    

    public downloadEnVariableTemplateFile(): Observable<any> {
        return this.apiService.getFileWithGetCall(`${config.apiBaseUrl}/eVariable.json/downloadEnVariableTemplateFile`);
    }

    public downloadEnVariable(payload: any): Observable<any> {
        return this.apiService.getFileWithPostCall(`${config.apiBaseUrl}/eVariable.json/downloadEnVariable`, payload);
    }

    public uploadEnVariable(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/eVariable.json/uploadEnVariable`, payload);
    }

    public fetchLinkEVariableWitUser(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/eVariable.json/fetchLinkEVariableWitUser`, payload);
    }

    public linkEVariableWithUser(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/eVariable.json/linkEVariableWithUser`, payload);
    }

}
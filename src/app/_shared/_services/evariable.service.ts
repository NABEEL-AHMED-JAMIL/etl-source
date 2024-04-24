import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../_model/object';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class EVariableService {

    constructor(private http: HttpClient) { }

    public addEnVariable(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/addEnVariable`, payload);
    }

    public updateEnVariable(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/updateEnVariable`, payload);
    }

    public fetchAllEnVariable(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/fetchAllEnVariable`, payload);
    }

    public fetchEnVariableById(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/fetchEnVariableById`, payload);
    }

    public fetchUserEnvByEnvKey(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/fetchUserEnvByEnvKey`, payload);
    }

    public deleteEnVariableById(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/deleteEnVariableById`, payload);
    }

    public deleteAllEnVariable(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/deleteAllEnVariable`, payload);
    }    

    public downloadEnVariableTemplateFile(): Observable<any> {
        return this.http.get(`${config.apiBaseUrl}/eVariable.json/downloadEnVariableTemplateFile`,
            {
                responseType: 'blob'
            });
    }

    public downloadEnVariable(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/eVariable.json/downloadEnVariable`, payload,
            {
                responseType: 'blob'
            });
    }

    public uploadEnVariable(payload: any): Observable<ApiResponse> {
        return this.http.post(`${config.apiBaseUrl}/eVariable.json/uploadEnVariable`, payload);
    }

    public fetchLinkEVariableWitUser(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/fetchLinkEVariableWitUser`, payload);
    }

    public linkEVariableWithUser(payload: any) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/eVariable.json/linkEVariableWithUser`, payload);
    }

}
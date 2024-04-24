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

    public addSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/addSTT`, payload);
    }

    public editSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/editSTT`, payload);
    }

    public deleteSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/deleteSTT`, payload);
    }

    public fetchAllSTTLinkForm(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchAllSTTLinkForm`, payload);
    }

    public linkSTTForm(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/linkSTTForm`, payload);
    }

    public fetchSTTBySttId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchSTTBySttId`, payload);
    }

    public fetchAllSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchAllSTT`, payload);
    }

    public deleteAllSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/deleteAllSTT`, payload);
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

    public deleteAllForms(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/deleteAllForms`, payload);
    }

    public fetchAllFormLinkSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchAllFormLinkSTT`, payload);
    }
    
    public linkFormSTT(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/linkFormSTT`, payload);
    }

    public fetchAllFormLinkSection(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchAllFormLinkSection`, payload);
    }

    public linkFormSection(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/linkFormSection`, payload);
    }

    public linkFormSectionOrder(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/linkFormSectionOrder`, payload);
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

    public deleteAllSections(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/deleteAllSections`, payload);
    }

    public fetchAllSectionLinkControl(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchAllSectionLinkControl`, payload);
    }
    
    public linkSectionControl(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/linkSectionControl`, payload);
    }

    public linkSectionControlOrder(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/linkSectionControlOrder`, payload);
    }

    public fetchAllSectionLinkForm(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchAllSectionLinkForm`, payload);
    }

    public linkSectionForm(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/linkSectionForm`, payload);
    }

    public linkSectionFormOrder(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/linkSectionFormOrder`, payload);
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

    public deleteAllControls(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/deleteAllControls`, payload);
    }

    public fetchAllControlLinkSection(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/fetchAllControlLinkSection`, payload);
    }

    public linkControlSection(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/linkControlSection`, payload);
    }

    public linkControlSectionOrder(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/formSetting.json/linkControlSectionOrder`, payload);
    }    

    public downloadSTTCommon(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/formSetting.json/downloadSTTCommon`, payload,
            {
                responseType: 'blob'
            });
    }

    public downloadSTTCommonTemplateFile(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/formSetting.json/downloadSTTCommonTemplateFile`, payload,
            {
                responseType: 'blob'
            });
    }

    public uploadSTTCommon(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/formSetting.json/uploadSTTCommon`, payload);
    }

}
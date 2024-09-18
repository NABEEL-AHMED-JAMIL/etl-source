import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiResponse, ApiService, ILookups } from '../index';
import { Observable, catchError, map } from 'rxjs';
import { config } from '../../../environments/environment';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class LookupService {

    constructor(private apiService: ApiService) { }

    public addLookupData(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/lookupData.json/addLookupData`, payload);
    }

    public updateLookupData(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/lookupData.json/updateLookupData`, payload);
    }

    public findAllParentLookupByUsername(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/lookupData.json/findAllParentLookupByUsername`, payload);
    }

    public fetchSubLookupDataByParentLookupDataId(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/lookupData.json/fetchSubLookupDataByParentLookupDataId`, payload);
    }

    public fetchLookupDataByLookupType(payload: any): Observable<ILookups> {
        return this.apiService.postData(`${config.apiBaseUrl}/lookupData.json/fetchLookupDataByLookupType`, payload)
            .pipe(map((response: ApiResponse) => {
                return response.data;
            }),
            catchError((error: any) => {
                return 'No Lookup Found';
            }));
    }

    public deleteLookupData(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/lookupData.json/deleteLookupData`, payload);
    }

    public downloadLookupDataTemplateFile(): Observable<any> {
        let params = new HttpParams();
        params = params.set('responseType', 'blob');
        return this.apiService.getData(`${config.apiBaseUrl}/lookupData.json/downloadLookupDataTemplateFile`, params);
    }

    public downloadLookupData(payload: any): Observable<any> {
        let params = new HttpParams();
        params = params.set('responseType', 'blob');
        return this.apiService.postData(`${config.apiBaseUrl}/lookupData.json/downloadLookupData`, payload, params);
    }

    public uploadLookupData(payload: any): Observable<any> {
        return this.apiService.postData(`${config.apiBaseUrl}/lookupData.json/uploadLookupData`, payload);
    }

}
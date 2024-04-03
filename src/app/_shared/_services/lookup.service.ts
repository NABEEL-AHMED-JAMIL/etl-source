import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, ILookups } from '../index';
import { Observable, catchError, map } from 'rxjs';
import { config } from '../../../environments/environment';
import { StorageService } from '../../_helpers';


@Injectable({
    providedIn: 'root'
})
export class LookupService {

    constructor(private http: HttpClient,
        private storageService: StorageService) {
    }

    public addLookupData(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/lookupData.json/addLookupData`, payload);
    }

    public updateLookupData(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/lookupData.json/updateLookupData`, payload);
    }

    public findAllParentLookupByUsername(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/lookupData.json/findAllParentLookupByUsername`, payload);
    }

    public fetchSubLookupDataByParentLookupDataId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/lookupData.json/fetchSubLookupDataByParentLookupDataId`, payload);
    }

    public fetchLookupDataByLookupType(payload: any): Observable<ILookups> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/lookupData.json/fetchLookupDataByLookupType`, payload)
            .pipe(map((response: ApiResponse) => {
                return response.data;
            }),
            catchError((error: any) => {
                return null;
            }));
    }

    public deleteLookupData(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/lookupData.json/deleteLookupData`, payload);
    }

    public downloadLookupDataTemplateFile(): Observable<any> {
        return this.http.get(`${config.apiBaseUrl}/lookupData.json/downloadLookupDataTemplateFile`,
            {
                responseType: 'blob'
            });
    }

    public downloadLookupData(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/lookupData.json/downloadLookupData`, payload,
            {
                responseType: 'blob'
            });
    }

    public uploadLookupData(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/lookupData.json/uploadLookupData`, payload);
    }

}
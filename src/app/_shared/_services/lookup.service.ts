import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCode, ApiResponse } from '../index';
import { Observable, first } from 'rxjs';
import { config } from '../../../environments/environment';
import { StorageService } from '../../_helpers';


@Injectable({
    providedIn: 'root'
})
export class LookupService {

    constructor(private http: HttpClient,
        private storageService: StorageService) {
    }

    public fetchCacheData(): void {
        this.http.get<ApiResponse>(`${config.apiBaseUrl}/lookup.json/fetchCacheData`)
        .pipe(first())
        .subscribe((response: any) => {
            if (response.status === ApiCode.SUCCESS) {
                this.storageService.set('lookup-cache', response.data);
            }
        });;
    }

    public addLookupData(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/lookup.json/addLookupData`, payload);
    }

    public deleteLookupData(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(`${config.apiBaseUrl}/lookup.json/deleteLookupData`, payload);
    }

    public fetchAllLookup(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/lookup.json/fetchAllLookup`, payload);
    }

    public fetchSubLookupByParentId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/lookup.json/fetchSubLookupByParentId`, payload);
    }

    public fetchLookupByLookupType(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/lookup.json/fetchLookupByLookupType`, payload);
    }    

    public updateLookupData(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(`${config.apiBaseUrl}/lookup.json/updateLookupData`, payload);
    }

    public uploadLookup(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/lookup.json/uploadLookup`, payload);
    }

    public downloadLookup(payload: any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/lookup.json/downloadLookup`, payload,
        {
            responseType: 'blob'
        });
    }

    public downloadLookupTemplateFile(): Observable<any> {
        return this.http.get(`${config.apiBaseUrl}/lookup.json/downloadLookupTemplateFile`,
        {
            responseType: 'blob'
        });
    }

}
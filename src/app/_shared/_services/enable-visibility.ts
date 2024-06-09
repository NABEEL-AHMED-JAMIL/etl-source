import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class EnableAbilityAndVisibilityService {

    constructor(private http: HttpClient) {
    }

    public addEnableAbility(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/addEnableAbility`, payload);
    }

    public editEnableAbility(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/editEnableAbility`, payload);
    }

    public fetchAllEnableAbility(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/fetchAllEnableAbility`, payload);
    }

    public fetchEnableAbilityById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/fetchEnableAbilityById`, payload);
    }

    public deleteEnableAbilityById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/deleteEnableAbilityById`, payload);
    }

    public deleteAllEnableAbility(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/deleteAllEnableAbility`, payload);
    }

    public addVisibility(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/addVisibility`, payload);
    }

    public editVisibility(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/editVisibility`, payload);
    }

    public fetchAllVisibility(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/fetchAllVisibility`, payload);
    }

    public fetchVisibilityById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/fetchVisibilityById`, payload);
    }

    public deleteVisibilityById(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/deleteVisibilityById`, payload);
    }

    public deleteAllVisibility(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/rpp.json/deleteAllVisibility`, payload);
    }

}
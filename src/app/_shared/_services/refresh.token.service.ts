import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class RefreshTokenService {

    constructor(private http: HttpClient) { }

    public fetchByAllRefreshToken(payload: any): Observable<ApiResponse> {
        return this.http.post<any>(`${config.apiBaseUrl}/refreshToken.json/fetchByAllRefreshToken`, payload);
    }

    public deleteRefreshToken(payload: any): Observable<ApiResponse> {
        return this.http.post<any>(`${config.apiBaseUrl}/refreshToken.json/deleteRefreshToken`, payload);
    }

    public deleteAllRefreshToken(payload: any): Observable<ApiResponse> {
        return this.http.post<any>(`${config.apiBaseUrl}/refreshToken.json/deleteAllRefreshToken`, payload);
    }    

}
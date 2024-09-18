import { Injectable } from '@angular/core';
import { ApiResponse, ApiService } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class RefreshTokenService {

    constructor(private apiService: ApiService) { }

    public fetchSessionStatistics(): Observable<ApiResponse> {
        return this.apiService.getData(`${config.authBaseUrl}/refreshToken.json/fetchSessionStatistics`);
    }

    public fetchByAllRefreshToken(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/refreshToken.json/fetchByAllRefreshToken`, payload);
    }

    public deleteRefreshToken(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/refreshToken.json/deleteRefreshToken`, payload);
    }

    public deleteAllRefreshToken(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.authBaseUrl}/refreshToken.json/deleteAllRefreshToken`, payload);
    }    

}
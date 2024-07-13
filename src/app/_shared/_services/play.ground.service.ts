import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class PlayGroundService {

    constructor(private http: HttpClient) {
    }

    public fetchAllFormForPlayGround(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/playGround.json/fetchAllFormForPlayGround`, payload);
    }

    public fetchFormForPlayGroundByFormId(payload: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${config.apiBaseUrl}/playGround.json/fetchFormForPlayGroundByFormId`, payload);
    }

}
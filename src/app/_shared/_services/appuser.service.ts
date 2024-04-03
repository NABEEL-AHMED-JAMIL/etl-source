import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AppUserService {

    constructor(private http: HttpClient) { }

    public findAppUserProfile(payload: any): Observable<ApiResponse> {
        let params = new HttpParams();
        params = params.set('username', payload);
        return this.http.get<any>(`${config.apiBaseUrl}/appUser.json/findAppUserProfile`, { params });
    }

    public updatePicture(payload:any): Observable<any> {
        return this.http.post(`${config.apiBaseUrl}/appUser.json/updatePicture`, payload);
    }


}
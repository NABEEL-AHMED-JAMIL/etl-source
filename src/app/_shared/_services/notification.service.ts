import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiResponse, ApiService } from '../index';
import { Observable } from 'rxjs';
import { config } from '../../../environments/environment';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private apiService: ApiService) { }

    public updateNotification(payload:any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/notification.json/updateNotification`, payload);
    }

    public fetchAllNotification(payload: any): Observable<ApiResponse> {
        let params = new HttpParams();
        params = params.set('username', payload);
        return this.apiService.getData(`${config.apiBaseUrl}/notification.json/fetchAllNotification`, params);
    }

}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { config } from '../../../environments/environment';
import {
    ApiResponse,
    ApiService
} from '../../_shared';


/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private readonly apiService: ApiService) { }

    public updateNotification(payload:any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/notification.json/updateNotification`, payload);
    }

    public fetchAllNotification(payload: any): Observable<ApiResponse> {
        let params = new HttpParams();
        params = params.set('username', payload);
        return this.apiService.getData(`${config.apiBaseUrl}/notification.json/fetchAllNotification`, params);
    }

}
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
export class PlayGroundService {

    constructor(private apiService: ApiService) { }
    
    public fetchAllFormForPlayGround(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/playGround.json/fetchAllFormForPlayGround`, payload);
    }

    public fetchFormForPlayGroundByFormId(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/playGround.json/fetchFormForPlayGroundByFormId`, payload);
    }

}
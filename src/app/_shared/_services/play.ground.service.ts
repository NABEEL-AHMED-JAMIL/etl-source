import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class PlayGroundService {

    constructor(private readonly apiService: ApiService) { }
    
    public fetchAllFormForPlayGround(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/playGround.json/fetchAllFormForPlayGround`, payload);
    }

    public fetchFormForPlayGroundByFormId(payload: any): Observable<ApiResponse> {
        return this.apiService.postData(`${config.apiBaseUrl}/playGround.json/fetchFormForPlayGroundByFormId`, payload);
    }

}
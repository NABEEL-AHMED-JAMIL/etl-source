import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from '../_model/object';
import { ApiService } from './api.service';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class CommomReportService {

    constructor(private apiService: ApiService) { }

    public fetchApiLKValue(apiUrl: string): Observable<ApiResponse> {
        return this.apiService.getData(apiUrl);
    }

}
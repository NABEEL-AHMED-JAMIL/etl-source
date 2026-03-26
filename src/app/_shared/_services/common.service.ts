import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
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
export class CommomReportService {

    constructor(private readonly apiService: ApiService) { }

    public fetchApiLKValue(apiUrl: string): Observable<ApiResponse> {
        return this.apiService.getData(apiUrl);
    }

}
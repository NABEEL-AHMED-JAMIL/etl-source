import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ApiCode, ApiResponse } from '../_model/object';


@Injectable({
    providedIn: 'root'
})
export class CommomReportService {

    constructor(private http: HttpClient) {
    }

    public fetchApiLKValue(apiUrl: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(apiUrl);
    }
    
    /**
     *  const observable = new Observable(observer => {
            observer.next({
                status: ApiCode.SUCCESS,
                message: "Sucess",
                data: [
                    { "lookupCode": "name", "lookupValue": "John" },
                    { "lookupCode": "age", "lookupValue": "30" },
                    { "lookupCode": "city", "lookupValue": "New York" },
                    { "lookupCode": "population", "lookupValue": "8622698" },
                    { "lookupCode": "fruit", "lookupValue": "apple" },
                    { "lookupCode": "color", "lookupValue": "red" },
                    { "lookupCode": "country", "lookupValue": "France" },
                    { "lookupCode": "language", "lookupValue": "French" },
                    { "lookupCode": "animal", "lookupValue": "tiger" },
                    { "lookupCode": "habitat", "lookupValue": "jungle" }
                ]
            });
            observer.complete();
        });
     */

}
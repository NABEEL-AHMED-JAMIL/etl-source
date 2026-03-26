import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    HttpClient,
    HttpErrorResponse,
    HttpParams
} from '@angular/common/http';
import {
    map,
    tap,
    catchError
} from 'rxjs/operators';
import {
    ApiCode,
    ApiResponse
} from '../../_shared';
import {
    AlertService,
    SpinnerService
} from '../../_helpers';


/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private readonly http: HttpClient,
        private readonly alertService: AlertService,
        private readonly spinnerService: SpinnerService) {
    }

    public getFileWithGetCall(apiUrl: any): Observable<any> {
        this.spinnerService.show();
        return this.http.get(apiUrl, { responseType: 'blob' }).pipe(
            map(reponse => reponse),
            tap(response => {
                this.spinnerService.hide();
            }),
            catchError(this.handleError.bind(this)));
    }

    public getFileWithPostCall(apiUrl: any, payload: any): Observable<any> {
        this.spinnerService.show();
        return this.http.post(apiUrl, payload, { responseType: 'blob' }).pipe(
            map(reponse => reponse),
            tap(response => {
                this.spinnerService.hide();
            }),
            catchError(this.handleError.bind(this)));
    }

    public getData(apiUrl: any, params?: HttpParams): Observable<ApiResponse> {
        this.spinnerService.show();
        const options = {
            params: params || new HttpParams()
        };
        return this.http.get(apiUrl, options).pipe(
            map(reponse => reponse),
            tap(response => {
                this.spinnerService.hide();
            }),
            catchError(this.handleError.bind(this)));
    }

    public postData(apiUrl: any, payload: any, params?: HttpParams): Observable<ApiResponse> {
        this.spinnerService.show();
        return this.http.post(apiUrl, payload, { ...params }).pipe(
            map(reponse => reponse),
            tap(response => {
                this.spinnerService.hide();
            }),
            catchError(this.handleError.bind(this)));
    }

    public updateData(apiUrl: any, payload: any, params?: HttpParams): Observable<ApiResponse> {
        this.spinnerService.show();
        const options = {
            params: params || new HttpParams()
        };
        return this.http.put(apiUrl, payload, options).pipe(
            map(reponse => reponse),
            tap(response => {
                this.spinnerService.hide();
            }),
            catchError(this.handleError.bind(this)));
    }

    public deleteData(apiUrl: string, payload: any, params?: HttpParams): Observable<ApiResponse> {
        this.spinnerService.show();
        const options = {
            params: params || new HttpParams(),
            body: payload
        };
        return this.http.delete(apiUrl, options).pipe(
            map(reponse => reponse),
            tap(response => {
                this.spinnerService.hide();
            }),
            catchError(this.handleError.bind(this)));
    }

    private handleError(error: HttpErrorResponse): void {
        console.error('Error occurred:', error);
        this.spinnerService.hide();
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message || 'Internal Server Error'}`;
        }
        this.alertService.showError(ApiCode.ERROR, errorMessage);
    }

}
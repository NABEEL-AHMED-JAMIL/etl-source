import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiCode, ApiResponse } from '../index';
import { AlertService, SpinnerService } from 'src/app/_helpers';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient,
        private alertService: AlertService,
        private spinnerService: SpinnerService) {
    }

    // GET request with error handling and tap
    public getData(apiUrl: any, params?: HttpParams): Observable<ApiResponse> {
        this.spinnerService.show();
        const options = {
            params: params || new HttpParams()
        };
        return this.http.get(apiUrl, options).pipe(
            map(reponse => reponse),
            tap(response => {
                console.log('Data fetched successfully:', response);
                this.spinnerService.hide();
            }),
            catchError(this.handleError.bind(this)));
    }

    // POST request with error handling and tap
    public postData(apiUrl: any, payload: any, params?: HttpParams): Observable<ApiResponse> {
        this.spinnerService.show();
        const options = {
            params: params || new HttpParams()
        };
        return this.http.post(apiUrl, payload, options).pipe(
            map(reponse => reponse),
            tap(response => {
                console.log('Data posted successfully:', response);
                this.spinnerService.hide();
            }),
            catchError(this.handleError.bind(this)));
    }

    // PUT request with error handling and tap
    public updateData(apiUrl: any, payload: any, params?: HttpParams): Observable<ApiResponse> {
        this.spinnerService.show();
        const options = {
            params: params || new HttpParams()
        };
        return this.http.put(apiUrl, payload, options).pipe(
            map(reponse => reponse),
            tap(response => {
                console.log(`Data updated successfully`, response);
                this.spinnerService.hide();
            }),
            catchError(this.handleError.bind(this)));
    }

    // DELETE request with error handling and tap
    public deleteData(apiUrl: string, payload: any, params?: HttpParams): Observable<ApiResponse> {
        this.spinnerService.show();
        const options = {
            params: params || new HttpParams(),
            payload
        };
        return this.http.delete(apiUrl, options).pipe(
            map(reponse => reponse),
            tap(response => {
                console.log(`Data deleted successfully`, response);
                this.spinnerService.hide();
            }),
            catchError(this.handleError.bind(this)));
    }
    
    // Method to handle errors
    private handleError(error: HttpErrorResponse): void {
        debugger
        console.error('Error occurred:', error); // Log the error to the console
        this.spinnerService.hide();  // Hide spinner on error
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message || 'Internal Server Error'}`;
        }
        this.alertService.showError(errorMessage, ApiCode.ERROR);
    }

}
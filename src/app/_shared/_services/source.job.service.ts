import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class SourceJobService {

    constructor(private apiService: ApiService) { }

}
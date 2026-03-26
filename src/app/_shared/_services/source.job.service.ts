import { Injectable } from '@angular/core';
import { ApiService } from '../../_shared';


/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
export class SourceJobService {

    constructor(private readonly apiService: ApiService) { }

}
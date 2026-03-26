import { Component, Input, OnInit } from '@angular/core';
import { CommomService } from '../../../_helpers';
import { AuthResponse } from '../../../_shared';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-org-filter',
    templateUrl: './org-filter.component.html',
    styleUrls: ['./org-filter.component.css']
})
export class OrgFilterComponent implements OnInit {

    @Input()
    public userInfo: AuthResponse;

    constructor(public commomService: CommomService) {
    }

    ngOnInit(): void {
       
    }


   

}
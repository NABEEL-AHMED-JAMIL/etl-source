import { Component, Input, OnInit } from '@angular/core';
import { CommomService } from 'src/app/_helpers';
import { AuthResponse } from 'src/app/_shared';


@Component({
    selector: 'app-org-filter',
    templateUrl: './org-filter.component.html',
    styleUrls: ['./org-filter.component.css']
})
export class OrgFilterComponent implements OnInit {

    @Input()
    public userInfo: AuthResponse;

    constructor(public commomService: CommomService,) {
    }

    ngOnInit(): void {
       
    }


   

}
import { Component, OnInit } from '@angular/core';
import { CommomService } from 'src/app/_helpers';

/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

    public title: any = 'ETL Source 2023';

    constructor(public commomService: CommomService) {
    }

    ngOnInit(): void {
    }

}

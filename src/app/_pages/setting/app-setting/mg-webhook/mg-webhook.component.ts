import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-mg-webhook',
    templateUrl: './mg-webhook.component.html',
    styleUrls: ['./mg-webhook.component.css']
})
export class MgWebHookComponent implements OnInit {

    public startDate: any;
    public endDate: any;
    public setOfCheckedId = new Set<any>();


    constructor() {
    }

    ngOnInit(): void {
    }

}

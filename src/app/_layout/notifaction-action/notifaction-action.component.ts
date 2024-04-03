import { Component, Input, OnInit } from '@angular/core';
import { INotifaction } from '../../_shared';

@Component({
    selector: 'app-notifaction-action',
    templateUrl: './notifaction-action.component.html',
    styleUrls: ['./notifaction-action.component.css']
})
export class NotifactionActionComponent implements OnInit {

    @Input()
    public jobNotifactionData: INotifaction[];
    @Input()
    public otherNotifactionData: INotifaction[];

    constructor() {
    }

    ngOnInit(): void {

    }

}

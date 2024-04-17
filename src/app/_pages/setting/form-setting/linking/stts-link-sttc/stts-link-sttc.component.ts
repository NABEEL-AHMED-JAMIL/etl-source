import { Component, Input, OnInit } from '@angular/core';
import { ActionType, IGenSection } from 'src/app/_shared';


@Component({
    selector: 'app-stts-link-sttc',
    templateUrl: './stts-link-sttc.component.html',
    styleUrls: ['./stts-link-sttc.component.css']
})
export class SttsLinkSttcComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenSection;

    constructor() {
    }

    ngOnInit(): void {
    }


}

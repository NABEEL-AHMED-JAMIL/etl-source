import { Component, Input, OnInit } from '@angular/core';
import { ActionType, IGenSection } from 'src/app/_shared';


@Component({
    selector: 'app-stts-link-sttf',
    templateUrl: './stts-link-sttf.component.html',
    styleUrls: ['./stts-link-sttf.component.css']
})
export class SttsLinkSttfComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenSection;

    constructor() {
    }

    ngOnInit(): void {
    }

}

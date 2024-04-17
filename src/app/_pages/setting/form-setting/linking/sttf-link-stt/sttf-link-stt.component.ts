import { Component, Input, OnInit } from '@angular/core';
import { ActionType, IGenFrom } from 'src/app/_shared';


@Component({
    selector: 'app-sttf-link-stt',
    templateUrl: './sttf-link-stt.component.html',
    styleUrls: ['./sttf-link-stt.component.css']
})
export class SttfLinkSttComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenFrom;


    constructor() {
    }

    ngOnInit(): void {
    }

}

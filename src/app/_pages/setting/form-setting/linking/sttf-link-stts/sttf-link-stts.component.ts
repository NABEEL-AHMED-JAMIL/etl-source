import { Component, Input, OnInit } from '@angular/core';
import { ActionType, IGenFrom } from 'src/app/_shared';

@Component({
    selector: 'app-sttf-link-stts',
    templateUrl: './sttf-link-stts.component.html',
    styleUrls: ['./sttf-link-stts.component.css']
})
export class SttfLinkSttsComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenFrom;

    constructor() {
    }

    ngOnInit(): void {
    }


}

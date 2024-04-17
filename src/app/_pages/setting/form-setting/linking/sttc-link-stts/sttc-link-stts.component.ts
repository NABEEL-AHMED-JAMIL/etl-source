import { Component, Input, OnInit } from '@angular/core';
import { ActionType, IGenControl } from 'src/app/_shared';


@Component({
    selector: 'app-sttc-link-stts',
    templateUrl: './sttc-link-stts.component.html',
    styleUrls: ['./sttc-link-stts.component.css']
})
export class SttcLinkSttsComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: IGenControl;

    constructor() {
    }

    ngOnInit(): void {
    }

}

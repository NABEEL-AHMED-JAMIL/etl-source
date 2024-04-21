import { Component, Input, OnInit } from '@angular/core';
import { ActionType, ISTT } from 'src/app/_shared';


@Component({
    selector: 'cu-source-ttask',
    templateUrl: 'cu-source-ttask.component.html',
    styleUrls: ['cu-source-ttask.component.css']
})
export class CuSourceTTaskComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: ISTT;

    public editAction = ActionType.EDIT;

    constructor() {
    }

    ngOnInit() {
    }

}
import { Component, Input, OnInit } from '@angular/core';
import {
    ActionType,
    ISourceTask
} from 'src/app/_shared';


@Component({
    selector: 'cu-source-task',
    templateUrl: 'cu-source-task.component.html',
    styleUrls: ['cu-source-task.component.css']
})
export class CuSourceTaskComponent implements OnInit {

    @Input()
    public actionType: ActionType;
    @Input()
    public editPayload: ISourceTask;

    public editAction = ActionType.EDIT;

    constructor() {
    }

    ngOnInit() {
    }

}
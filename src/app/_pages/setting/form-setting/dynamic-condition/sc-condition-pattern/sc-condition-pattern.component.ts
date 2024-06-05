import { Component, Input, OnInit } from '@angular/core';
import { IGenFrom } from 'src/app/_shared';


@Component({
    selector: 'app-sc-condition-pattern',
    templateUrl: './sc-condition-pattern.component.html',
    styleUrls: ['./sc-condition-pattern.component.css']
})
export class SCConditionPatternComponent implements OnInit {

    @Input()
    public editPayload: IGenFrom;

    constructor() {
    }

    ngOnInit(): void {
    }
}
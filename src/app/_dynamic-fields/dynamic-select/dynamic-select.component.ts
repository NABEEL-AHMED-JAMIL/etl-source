import { Component, OnInit } from '@angular/core';
import { DynamicFieldComponent } from '../dynmic-field';

/**
 * Select | Multi Select
 * */
@Component({
    selector: 'dynamic-select',
    templateUrl: './dynamic-select.component.html',
    styleUrls: ['./dynamic-select.component.css']
})
export class DynamicSelectComponent extends DynamicFieldComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
import { Component, OnInit } from '@angular/core';
import { DynamicFieldComponent } from '../dynmic-field';

/**
 * TextArea
 * */
/**
 * @author Nabeel Ahmed
 */
@Component({
    selector: 'dynamic-textarea',
    templateUrl: './dynamic-textarea.component.html',
    styleUrls: ['./dynamic-textarea.component.css']
})
export class DynamicTextAreaComponent extends DynamicFieldComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}